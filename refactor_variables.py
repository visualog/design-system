
import json
import re

palette_path = '/Users/im_018/Documents/GitHub/Project/whatt/design-system-site/src/data/color_palette.json'
mapping_path = '/Users/im_018/Documents/GitHub/Project/whatt/design-system-site/src/data/theme_color_mapping.json'

with open(palette_path, 'r') as f:
    palette = json.load(f)

variable_map = {}

# Process Palette
for family, tokens in palette.items():
    # Family name from key, e.g. "Blue", "Gray", "Yellow Orange" -> "YellowOrange" ?
    # User previously asked to remove spaces: "Yellow Orange" -> "YellowOrange"
    # So I should use PascalCase with no spaces for the family part of the variable.
    clean_family = family.replace(' ', '')
    
    for token in tokens:
        old_var = token['variable']
        level = token['level']
        
        # Clean level: "alpha (10%)" -> "alpha" is what they likely want if they strictly follow 'Family/Level'.
        # Although BlackAlpha used "10", "20" etc.
        # Let's verify existing level formats.
        # "10", "20", "white", "alpha (10%)"
        # If level is "alpha (10%)", user likely wants "alpha" or "alpha_10"?
        # Previous manual fix for "Red alpha" used "light/Red/alpha" in Theme.md? 
        # But in raw tokens, level is "alpha (10%)".
        # BlackAlpha tokens had explicit "10", "20".
        # Let's standardize "alpha (10%)" to "alpha" if it's the only alpha.
        # Wait, usually "alpha (10%)" corresponds to a variable like "color_red_alpha".
        # So "Red/alpha" seems appropriate.
        
        clean_level = level
        if "alpha" in str(level).lower():
            if "(" in str(level):
                 clean_level = "alpha" # Simplified
        
        # Special case: BlackAlpha/10 is already correct, don't double process if possible, 
        # or just overwrite it which is fine.
        
        if clean_family == "BlackAlpha":
            # Level is just "10" etc.
            new_var = f"{clean_family}/{clean_level}"
        else:
            new_var = f"{clean_family}/{clean_level}"
            
        token['variable'] = new_var
        variable_map[old_var] = new_var

# Save Palette
with open(palette_path, 'w') as f:
    json.dump(palette, f, indent=2)

# Process Mapping
with open(mapping_path, 'r') as f:
    mapping_content = f.read()

# Replace all old variables with new ones
# Loop might be slow if naive, but 100ish replacement is instant.
# We sort by length descending to avoid partial replacements if any overlap (unlikely with this format)
sorted_vars = sorted(variable_map.keys(), key=len, reverse=True)

for old_var in sorted_vars:
    # Use generic replacement?
    # theme_color_mapping values are "color_Blue_10".
    # But variable_map keys from palette might be "color_blue_10" (lowercase family).
    # Wait, `color_palette.json` had "color_blue_10".
    # `theme_color_mapping.json` has "color_Blue_10" (Capitalized).
    # THIS IS A MISMATCH. I need to handle both casing or map them smartly.
    
    # Construct capitalization variants for mapping replacement
    # variable_map[old_var] = new_var
    # old_var from palette is "color_blue_10"
    # new_var is "Blue/10"
    
    # Replace exact match
    mapping_content = mapping_content.replace(f'"{old_var}"', f'"{variable_map[old_var]}"')

    # Also try replacing capitalized version "color_Blue_10" if old_var was "color_blue_10"
    if old_var.startswith("color_"):
        parts = old_var.split('_')
        # parts = ['color', 'blue', '10']
        if len(parts) >= 3:
            # Capitalize the family part (index 1...N-1?)
            # color_yellow_orange_10 -> color_YellowOrange_10 ? 
            # or color_Yellow_Orange_10?
            # Looking at theme_color_mapping.json: "color_Blue_10", "color_Gray_10".
            # "color_YellowOrange_10" ? Let's check.
            # I can just try constructing "color_{TitleCaseFamily}_{Level}"
            
            # Simple heuristic: try to replace the version found in theme_color_mapping
            # Instead of guessing, I can look for "color_Family_Level" pattern in mapping_content 
            # and verify if I have a replacement for it.
            pass

# Re-read mapping as JSON to do safe value replacement?
# But keys are theme tokens, values are raw tokens. matches are in values.
mapping_json = json.loads(mapping_content)

def transform_value(val):
    # Check if val is in our map
    if val in variable_map:
        return variable_map[val]
    
    # Check if val matches "color_Family_Level" where "color_family_level" is in map
    val_lower = val.lower()
    if val_lower in variable_map:
        return variable_map[val_lower]
        
    # Check "color_Blue_10" -> "color_blue_10"
    # Actually, theme_color_mapping.json uses "color_Blue_10".
    # palette.json (before my edit) used "color_blue_10".
    # So map["color_blue_10"] = "Blue/10".
    # I need to match "color_Blue_10" to "Blue/10".
    
    # Try case-insensitive lookup if strict fails
    for old, new in variable_map.items():
        if old.lower() == val.lower():
            return new
            
    return val

def recursive_update(obj):
    for k, v in obj.items():
        if isinstance(v, dict):
            recursive_update(v)
        elif isinstance(v, str):
            obj[k] = transform_value(v)

with open(mapping_path, 'r') as f:
    mapping_data = json.load(f)

recursive_update(mapping_data)

with open(mapping_path, 'w') as f:
    json.dump(mapping_data, f, indent=2)

print("Successfully refactored variables.")
