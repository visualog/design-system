import json
import re

# Load mapping
with open('src/data/semantic_color_mapping.json', 'r') as f:
    mapping_data = json.load(f)

# Helper to find key in nested dict (flattened in logic effectively)
# The json is structured as { "text": { ... }, "avatar": { ... } }
# But we can probably just search in the relevant section or all sections.
# "Color_text_primary" is unique enough.
flat_mapping = {}
for group in mapping_data.values():
    for k, v in group.items():
        flat_mapping[k] = v

def to_camel(s):
    # cool_gray -> coolGray
    # deep_blue -> deepBlue
    if '_' not in s: return s
    parts = s.split('_')
    return parts[0] + ''.join(x.title() for x in parts[1:])

def camel_to_space(s):
    # coolGray -> cool gray
    s = re.sub(r'(?<!^)(?=[A-Z])', ' ', s).lower()
    return s

def format_value(val):
    if not val: return ""
    # Remove color_
    if val.startswith("color/"): # Handled rare case in icons section?
        val = val.replace("color/", "")
        # icon section uses slashes already?
        # JSON L68: "Color_icon_primary": "color/neutral/100"
        # So "neutral/100".
        return val
    
    val = val.replace("color_", "")
    
    # Handle known families with underscores -> camelCase
    # cool_gray -> coolGray
    # deep_blue -> deepBlue
    # yellow_orange -> yellowOrange
    # light_blue -> lightBlue
    # deep_green -> deepGreen
    # black_alpha -> blackAlpha (if exists)
    
    families = ['cool_gray', 'deep_blue', 'yellow_orange', 'light_blue', 'deep_green', 'black_alpha']
    
    for fam in families:
        if fam in val:
            camel = to_camel(fam)
            val = val.replace(fam, camel)
            
    # Replace remaining underscores with slashes
    val = val.replace('_', '/')
    
    # Specific adjustment for avatar: avatar/coolGray/bg -> avatar/coolGray/bg?
    # No, value is e.g. color_avatar_cool_gray_20 -> avatar/coolGray/20
    
    return val

# Read MD file
with open('src/data/# Semantic_dev_code.md', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    line = line.rstrip()
    if line.startswith('- '):
        token = line[2:].strip()
        # token: text.primary
        # Construct key: Color_text_primary
        # Case: avatar.coolGray.bg -> Color_avatar_cool gray_bg
        
        parts = token.split('.')
        # Parts[0] is group (text, bg, icon, border, avatar)
        group = parts[0]
        
        key = ""
        if group == 'avatar':
            # avatar.coolGray.bg
            # family is parts[1] (coolGray)
            family = parts[1]
            family_space = camel_to_space(family)
            suffix = '_'.join(parts[2:]) # bg_bold
            key = f"Color_avatar_{family_space}_{suffix}"
        else:
            # text.primary -> Color_text_primary
            # bg.interactive.primary -> Color_bg_interactive_primary
            key = "Color_" + token.replace('.', '_')
            
        value = flat_mapping.get(key)
        
        # Fallback if specific key construction fails (e.g. casing issue)
        if not value:
            # Try searching?
            pass

        if value:
            formatted = format_value(value)
            new_lines.append(f"- {token}: {formatted}")
        else:
            new_lines.append(line)
    else:
        new_lines.append(line)

print('\n'.join(new_lines))
