import json
import re

# Read Primitives.md
with open('src/data/# Primitives.md', 'r') as f:
    lines = f.readlines()

dark_map = {}
in_dark_section = False
current_family = ""

# Parse Dark Theme section
# Expected format:
# ## Dark Theme
# ### Blue
# - Blue/10: #17191C
for line in lines:
    line = line.strip()
    if line == "## Dark Theme":
        in_dark_section = True
        continue
    if not in_dark_section:
        continue
    
    if line.startswith("### "):
        current_family = line.replace("### ", "").strip()
    elif line.startswith("- "):
        # - Blue/10: #17191C
        # Extract "Blue/10" and "#17191C"
        parts = line.split(":")
        if len(parts) >= 2:
            key_part = parts[0].replace("- ", "").strip()
            # key_part: Blue/10 or Gray/white
            
            # The JSON logic relies on Family + Level.
            # key_part usually is Family/Level.
            # but sometimes Family in header matches Family in key.
            
            # We need to map "Blue/10" -> (Family="Blue", Level="10")
            
            token_val = parts[1].strip().split(" ")[0] # #17191C (sometines comments?)
            
            dark_map[key_part] = token_val

# Read color_palette.json
with open('src/data/color_palette.json', 'r') as f:
    data = json.load(f)

# Update JSON
update_count = 0
for family_key, tokens in data.items():
    for token in tokens:
        # token['variable'] is e.g. "Blue/10"
        variable = token.get('variable')
        if variable in dark_map:
            token['hexDark'] = dark_map[variable]
            update_count += 1
        elif family_key == "Gray" and token['level'] == "white":
             # Special case: Gray/white
             # JSON variable: "Gray/white"
             if "Gray/white" in dark_map:
                 token['hexDark'] = dark_map["Gray/white"]
                 update_count += 1

print(f"Updated {update_count} tokens with hexDark values.")

with open('src/data/color_palette.json', 'w') as f:
    json.dump(data, f, indent=2)
