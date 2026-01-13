import json
import re
import os

markdown_path = 'src/data/# Theme.md'
json_path = 'src/data/theme_color_mapping.json'

def parse_theme_md(md_path):
    with open(md_path, 'r') as f:
        lines = f.readlines()

    data = {
        "brand": {},
        "neutral": {},
        "error": {},
        "loading": {},
        "success": {},
        "avatar": {}
    }

    current_section = None
    
    # Map markdown headers to JSON keys
    section_map = {
        "BRAND": "brand",
        "NEUTRAL": "neutral",
        "ERROR": "error",
        "LOADING": "loading",
        "SUCCESS": "success",
        "AVATAR": "avatar"
    }

    in_comment_block = False

    for line in lines:
        line = line.strip()
        
        # Handle block comment markers
        if line.startswith('/*') or line.startswith('****'):
             if '*/' in line or '****/' in line: # Single line comment or end of block on same line?
                 # If it starts with marker, check if it's start or end
                 if line.endswith('*/') or line.endswith('****/'):
                      # Treat as single line skip if it looks like start and end
                      pass 
                      # But wait, user format is:
                      # /**** 이건 보류
                      # ...
                      # ****/
                      # So start is /**** and end is ****/
                 pass
             
        # Check start of block
        if line.startswith('/*') or line.startswith('****'):
            # If we are already in block, and this is end marker?
            if in_comment_block and (line.endswith('*/') or line.endswith('****/')):
                in_comment_block = False
                continue
            # If not in block, start block?
            if not in_comment_block:
                in_comment_block = True
                continue
        
        # Check end of block (if strictly just matching content)
        if in_comment_block:
            if line.endswith('*/') or line.endswith('****/'):
                in_comment_block = False
            continue

        # Check for main headers
        if line.startswith('## '):
            header = line.replace('## ', '').strip()
            if header in section_map:
                current_section = section_map[header]
            else:
                current_section = None # Skip unknown sections
            continue
            
        # Check for sub-headers (like ### AVATAR - RED)
        # We assume these still belong to the main current_section (e.g. AVATAR)
        if line.startswith('### '):
            continue

        # Ignore comments
        if line.startswith('/*') or line.startswith('*/') or line.startswith('****'):
            continue

        # Parse valid list items
        # Format: - key: value
        # Example: - brand/10: Blue/10
        if line.startswith('- ') and ':' in line and current_section:
            parts = line.split(':', 1)
            key_part = parts[0].replace('- ', '').strip()
            value_part = parts[1].strip()

            # Transform key: brand/10 -> color_brand_10
            # Replace / with _ and spaces with _
            # Handle camelCase in key if strictly mapped: e.g. yellowOrange -> yellow_orange?
            # Existing JSON uses snake_case keys like color_neutral_white, color_avatar_yellow_orange_20
            # But Theme.md has keys like avatar/yellowOrange/20
            
            # Let's convert camelCase to snake_case for the key part
            # Regex to insert underscore before capital letters
            key_snake = re.sub(r'(?<!^)(?=[A-Z])', '_', key_part).lower()
            key_snake = key_snake.replace('/', '_')
            
            final_key = f"color_{key_snake}"
            
            data[current_section][final_key] = value_part

    return data

def main():
    if not os.path.exists(markdown_path):
        print(f"Error: {markdown_path} not found")
        return

    new_data = parse_theme_md(markdown_path)
    
    with open(json_path, 'w') as f:
        json.dump(new_data, f, indent=2)
    
    print(f"Successfully updated {json_path}")

if __name__ == "__main__":
    main()
