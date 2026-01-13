import re
import json
import colorsys

source_file = '/Users/im_018/Documents/GitHub/Project/whatt/design-system-site/src/data/# Primitives.md'
target_file = '/Users/im_018/Documents/GitHub/Project/whatt/design-system-site/src/data/color_palette.json'

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 8: # Handle alpha
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def hex_to_hsl(hex_color):
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 8:
        hex_color = hex_color[:6] # Ignore alpha for HSL calculation base on standard hex
    
    r, g, b = (int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    h, l, s = colorsys.rgb_to_hls(r / 255.0, g / 255.0, b / 255.0)
    return h * 360, s * 100, l * 100

def parse_primitives(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Extract Light Theme section
    print(f"Total content length: {len(content)}")
    # Split using explicit section headers instead of regex to avoid confusion with ### subheaders
    parts = content.split('## Light Theme')
    if len(parts) < 2:
        print("Light Theme section not found")
        return {}
    
    # Take everything after Light Theme
    after_light = parts[1]
    
    # content ends at '## Dark Theme' or EOF
    light_theme_content = after_light.split('## Dark Theme')[0]
    print(f"Found Light Theme content length: {len(light_theme_content)}")
    
    # Split by ### headers
    sections = re.split(r'### ', light_theme_content)
    palette = {}

    family_mapping = {
        'YellowOrange': 'Yellow Orange',
        'DeepGreen': 'Deep Green',
        'LightBlue': 'Light Blue',
        'DeepBlue': 'Deep Blue',
        'CoolGray': 'Cool Gray',
        # Others match directly
    }

    for section in sections:
        if not section.strip():
            continue
        
        lines = section.strip().split('\n')
        family_name = lines[0].strip()
        
        # Map family name if needed
        json_family_name = family_mapping.get(family_name, family_name)
        
        tokens = []
        for line in lines[1:]:
            line = line.strip()
            if not line.startswith('-'):
                continue
            
            # Parse line: - Family/Level: #Hex
            match = re.match(r'- (.*?)/(.*?): (#([0-9A-Fa-f]+))', line)
            if match:
                # family_part = match.group(1) # Unused
                level = match.group(2)
                hex_value = match.group(3)
                
                # Special handling for level names
                if level == 'white':
                    level = 'white'
                elif level == 'alpha':
                    level = 'alpha (10%)'
                elif json_family_name == 'Black alpha':
                     # Keep strict mapping if possible, but MD has just "10", "20"
                     # Target JSON has "10 (10%)"
                     # But plan allowed "10". Let's use simple "10" as per MD to stay clean
                     # UNLESS compatibility is broken. 
                     # Checking previous file content: "10 (10%)" was used.
                     # Let's clean it up to "10" if strict compliance to MD is goal.
                     # But to match logic, maybe appending % is good?
                     # Plan said: "Black alpha 10 is 10%. So '10' is fine."
                     pass
                
                rgb = hex_to_rgb(hex_value)
                hsl = hex_to_hsl(hex_value)
                
                variable_name = f"color_{json_family_name.lower().replace(' ', '_')}_{level.replace(' (10%)', '_alpha').replace('%', '')}"
                # logic to match existing variable naming convention roughly
                # Existing: color_blue_10, color_gray_10, color_red_alpha, color_blackalpha
                
                if level == 'alpha (10%)':
                     variable_name = f"color_{json_family_name.lower().replace(' ', '_')}_alpha"
                elif json_family_name == 'Black alpha':
                     variable_name = "color_blackalpha" 
                
                rgb_str = f"rgb({rgb[0]}, {rgb[1]}, {rgb[2]})"
                hsl_str = f"hsl({round(hsl[0])}, {round(hsl[1])}, {round(hsl[2])})"
                
                token = {
                    "level": level,
                    "hex": hex_value,
                    "rgb": rgb_str,
                    "hsl": hsl_str,
                    "variable": variable_name
                }
                tokens.append(token)
        
        if tokens:
            palette[json_family_name] = tokens

    return palette

def update_json(data, target_path):
    with open(target_path, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    new_palette = parse_primitives(source_file)
    if new_palette:
        update_json(new_palette, target_file)
        print(f"Updated {target_file} successfully.")
    else:
        print("No data parsed.")
