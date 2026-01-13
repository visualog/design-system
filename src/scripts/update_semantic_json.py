import re
import json
import os

def parse_design_tokens(filepath):
    """Parses # Semantic.md to get design tokens by category."""
    tokens = {}
    current_category = None
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        return {}

    for line in lines:
        line = line.strip()
        if line.startswith('## COLOR - '):
            current_category = line.replace('## COLOR - ', '').strip()
            if current_category not in tokens:
                tokens[current_category] = []
        elif line.startswith('- Color/'):
            token_name = line.replace('- ', '').strip()
            if current_category:
                tokens[current_category].append(token_name)
    
    return tokens

def parse_dev_tokens(filepath):
    """Parses # Semantic_dev_code.md to get dev tokens and values by category."""
    tokens = {}
    current_category = None
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
         print(f"Error: File not found: {filepath}")
         return {}

    for line in lines:
        line = line.strip()
        if line.startswith('## COLOR - '):
            current_category = line.replace('## COLOR - ', '').strip()
            if current_category not in tokens:
                tokens[current_category] = []
        elif line.startswith('- ') and ':' in line: # e.g. - text.primary: neutral/100
            parts = line.replace('- ', '').split(':')
            token_name = parts[0].strip()
            token_value = parts[1].strip() if len(parts) > 1 else ""
            if current_category:
                tokens[current_category].append({
                    "devToken": token_name,
                    "value": token_value
                })
        elif line.startswith('- ') and ':' not in line: # Handle cases without value if any
            token_name = line.replace('- ', '').strip()
            if current_category and token_name:
                 tokens[current_category].append({
                    "devToken": token_name,
                    "value": ""
                })

    return tokens

def normalize_key(key):
    """Normalizes key for matching."""
    # Remove 'Color/' prefix case-insensitively
    key = re.sub(r'^Color/', '', key, flags=re.IGNORECASE)
    # Remove all non-alphanumeric characters (including spaces, dots, slashes) and lowercase
    return re.sub(r'[^a-zA-Z0-9]', '', key).lower()

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    design_file = os.path.join(base_dir, 'data', '# Semantic.md')
    dev_file = os.path.join(base_dir, 'data', '# Semantic_dev_code.md')
    output_file = os.path.join(base_dir, 'data', 'semantic_color_mapping.json')

    design_tokens_by_cat = parse_design_tokens(design_file)
    dev_tokens_by_cat = parse_dev_tokens(dev_file)

    # Flatten design tokens for easier lookup map
    design_token_map = {}
    for cat, tokens in design_tokens_by_cat.items():
        for token in tokens:
            # normalize 
            # Example: Color/text/primary -> textprimary
            norm = normalize_key(token)
            design_token_map[norm] = token

    merged_data = {}

    for cat, dev_list in dev_tokens_by_cat.items():
        merged_data[cat] = []
        for dev_item in dev_list:
            dev_token = dev_item['devToken']
            val = dev_item['value']
            
            # Try to match design token
            # devToken: text.primary -> textprimary
            norm = normalize_key(dev_token)
            
            design_token = design_token_map.get(norm, "")
            
            # Fallback check for partial matches or specific adjustments if needed
            if not design_token:
                # Debug print
                # print(f"Warning: No match for dev token: {dev_token} (norm: {norm})")
                pass

            merged_data[cat].append({
                "devToken": dev_token,
                "designToken": design_token, # Might be empty if no match
                "value": val
            })

    # Write to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully generated {output_file}")

if __name__ == "__main__":
    main()
