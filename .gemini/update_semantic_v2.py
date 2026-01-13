import json
import re

# Load mapping
with open('src/data/semantic_color_mapping.json', 'r') as f:
    mapping_data = json.load(f)

flat_mapping = {}
for group in mapping_data.values():
    for k, v in group.items():
        flat_mapping[k] = v

def to_camel(s):
    if '_' not in s: return s
    parts = s.split('_')
    return parts[0] + ''.join(x.title() for x in parts[1:])

def camel_to_space(s):
    s = re.sub(r'(?<!^)(?=[A-Z])', ' ', s).lower()
    return s

def format_value(val):
    if not val: return ""
    # Handle recursive Semantic references
    # e.g. Color_icon_inverse
    if val in flat_mapping:
        val = flat_mapping[val]
        # Recursion invalid if circular, but assume DAG.
        # One level might be enough, but let's loop if needed or just recurs once.
        if val in flat_mapping: # Nested twice?
             val = flat_mapping[val]

    # Handle explicit color/ prefix in JSON values (e.g. color/neutral/100)
    if val.startswith("color/"): 
        val = val.replace("color/", "")
        return val
    
    val = val.replace("color_", "")
    
    families = ['cool_gray', 'deep_blue', 'yellow_orange', 'light_blue', 'deep_green', 'black_alpha']
    
    for fam in families:
        if fam in val:
            camel = to_camel(fam)
            val = val.replace(fam, camel)
            
    val = val.replace('_', '/')
    return val

# Read MD file
with open('src/data/# Semantic_dev_code.md', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    line = line.rstrip()
    if line.startswith('- '):
        token = line[2:].strip()
        # Handle cases where token might already have value (unlikely given previous read)
        if ':' in token:
            token = token.split(':')[0]
            
        parts = token.split('.')
        group = parts[0]
        
        key = ""
        if group == 'avatar':
            family = parts[1]
            family_space = camel_to_space(family)
            suffix = '_'.join(parts[2:])
            key = f"Color_avatar_{family_space}_{suffix}"
        else:
            key = "Color_" + token.replace('.', '_')
            
        value = flat_mapping.get(key)
        
        if value:
            formatted = format_value(value)
            new_lines.append(f"- {token}: {formatted}")
        else:
            new_lines.append(line)
    else:
        new_lines.append(line)

print('\n'.join(new_lines))
