
import re
import json
import colorsys

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 8: # Handle alpha definition in file (RRGGBBAA) -> RRGGBB for base, but we preserve full hex
        hex_color = hex_color[:6]
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hsl_string(r, g, b):
    h, l, s = colorsys.rgb_to_hls(r / 255.0, g / 255.0, b / 255.0)
    return f"hsl({round(h * 360)}, {round(s * 100)}%, {round(l * 100)}%)"

def parse_primitives(file_path):
    light_data = {}
    dark_data = {}
    current_mode = None
    current_family = None
    
    with open(file_path, 'r') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("## Light Theme"):
            current_mode = "light"
            continue
        elif line.startswith("## Dark Theme"):
            current_mode = "dark"
            continue
            
        if line.startswith("###"):
            current_family = line.strip("### ").strip()
            # Initialize family dict if needed
            if current_mode == "light":
                if current_family not in light_data: light_data[current_family] = {}
            else:
                if current_family not in dark_data: dark_data[current_family] = {}
            continue
            
        if line.startswith("-") and current_family:
            # - Family/Level: #Hex
            parts = line.split(":")
            if len(parts) >= 2:
                token_part = parts[0].strip("- ").strip()
                hex_value = parts[1].strip()
                
                # Extract level
                # Token format: Family/Level
                if "/" in token_part:
                    _, level = token_part.split("/", 1)
                else:
                    level = token_part # Fallback
                
                if current_mode == "light":
                    light_data[current_family][level] = hex_value
                else:
                    dark_data[current_family][level] = hex_value

    return light_data, dark_data

def generate_json(light_data, dark_data):
    # Union of all families
    all_families = set(list(light_data.keys()) + list(dark_data.keys()))
    output = {}

    for family in all_families:
        output[family] = []
        l_levels = set(light_data.get(family, {}).keys())
        d_levels = set(dark_data.get(family, {}).keys())
        all_levels = l_levels.union(d_levels)
        
        # Sort levels? 
        # Numeric sorting is preferred, handling 'alpha', 'white' etc
        def sort_key(lvl):
            lvl = lvl.lower()
            if lvl == 'white': return -1
            if lvl == 'alpha': return 999 
            if 'alpha' in lvl: return 998 # e.g. alpha(10%) -> Treat as alpha? 
            # In Primitives.md, alpha is usually 'alpha' string.
            # But wait, Primitives.md has separate 'BlackAlpha' family with numeric levels.
            # For 'Red/alpha', the level is 'alpha'.
            
            # Extract number
            try:
                 return int(lvl)
            except:
                 return 1000 # Fallback
        
        sorted_levels = sorted(list(all_levels), key=sort_key)

        for level in sorted_levels:
            l_hex = light_data.get(family, {}).get(level)
            d_hex = dark_data.get(family, {}).get(level)
            
            # Base data on Light Hex if available, else Dark Hex
            base_hex = l_hex if l_hex else d_hex
            
            # Calculate RGB/HSL string for 'rgb' field (used for CSS var fallback mostly, or legacy)
            # We strip alpha for RGB calc
            r, g, b = hex_to_rgb(base_hex)
            rgb_str = f"rgb({r}, {g}, {b})"
            hsl_str = rgb_to_hsl_string(r, g, b)
            
            token_obj = {
                "level": level if level != 'alpha' else 'alpha (10%)', # Reformat 'alpha' level name to match existing JSON convention? 
                # Existing JSON used "alpha (10%)" or similar?
                # Let's check existing JSON for 'Red/alpha'.
                # Actually, in standard families (Red, Blue), the alpha token is usually separate or named specifically.
                # In Primitives.md, it is just "alpha".
                # User's previous customized JSON usually had "alpha (10%)" for Gray?
                # But for Chromatic, let's keep it simple or match Primitives.md: "alpha"
                # Wait, existing `ColorPaletteDisplay` logic expects specific level names for sorting?
                # Lines 298: `const grayDisplayLevels = [...nonAlphaLevels, 'alpha (10%)'];`
                # Lines 301: `chromaticOnlyLevels` ... `level === 'alpha (10%)'`
                # So the UI expects "alpha (10%)".
                # But Primitives.md says "Red/alpha".
                # I should probably map "alpha" -> "alpha (10%)" to keep UI working without changing UI code too much.
                
                # "hex": l_hex,
                # "hexDark": d_hex
            }
            
            # Correction on level naming for UI compatibility
            ui_level = level
            if level == 'alpha':
                ui_level = 'alpha (10%)'
            
            token_obj["level"] = ui_level
            token_obj["variable"] = f"{family}/{level}" # Keep original "Family/alpha" variable name?
            
            if l_hex:
                token_obj["hex"] = l_hex
            # If l_hex is missing, do we include key as empty string? or omit?
            # JSON standard usually includes keys.
            else:
                token_obj["hex"] = "" # or null? Using empty string for safety.

            if d_hex:
                token_obj["hexDark"] = d_hex
            else:
                token_obj["hexDark"] = ""

            token_obj["rgb"] = rgb_str
            token_obj["hsl"] = hsl_str
            
            output[family].append(token_obj)

    return output

if __name__ == "__main__":
    primitives_path = "src/data/# Primitives.md"
    json_path = "src/data/color_palette.json"
    
    l_data, d_data = parse_primitives(primitives_path)
    new_json_data = {"colors": {"palette": generate_json(l_data, d_data)}}
    
    with open(json_path, 'w') as f:
        json.dump(new_json_data, f, indent=2)
        
    print(f"Updated {json_path}")
