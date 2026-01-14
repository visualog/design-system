import { designSystemData } from '../utils/dataLoader';



export const resolveColorData = (tokenRef: string | undefined): { hex: string, hexDark?: string } | undefined => {
    if (!tokenRef || tokenRef.startsWith('#')) return tokenRef ? { hex: tokenRef } : undefined;

    // We don't cache objects in the simple string cache, or we need a new cache. 
    // For simplicity, let's re-run resolution or add object cache if needed. 
    // Given the scale, re-running is likely fine for now, or we can use a separate cache.

    const { palette, themeMapping } = designSystemData.colors;

    const resolve = (token: string): { hex: string, hexDark?: string } | undefined => {
        if (!token || token.startsWith('#')) return { hex: token };

        // Handle "Family/Level" format (e.g. "brand/60" or "Blue/10") or "avatar/Color/Level"
        if (token.includes('/')) {
            const parts = token.split('/');

            // Handle 2-part normal tokens
            if (parts.length === 2) {
                const [family, level] = parts;

                // 1. Check Direct Palette (Primitive)
                const familyKey = family.replace(/\s/g, '');
                const colorFamily = (palette as any)[familyKey];
                if (colorFamily && Array.isArray(colorFamily)) {
                    const shade = colorFamily.find(s =>
                        s.level.toString().trim() === level.toString().trim() ||
                        s.variable === `${family}/${level}`
                    );
                    if (shade?.hex) {
                        return { hex: shade.hex, hexDark: shade.hexDark };
                    }
                }

                // 2. Check Theme Mapping (e.g. "brand/60" -> "color_brand_60")
                const themeKey = `color_${family}_${level}`.toLowerCase();
                for (const category of Object.values(themeMapping)) {
                    if (themeKey in category) {
                        const mappedToken = (category as any)[themeKey];
                        const result = resolve(mappedToken);
                        if (result) return result;
                    }
                }
            } else if (parts.length === 3 && parts[0] === 'avatar') {
                // Handle 3-part avatar tokens: "avatar/red/20" -> "color_avatar_red_20"
                const [_, sub, level] = parts;

                // Construct theme key: color_avatar_red_20
                const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toLowerCase();
                const subSnake = toSnakeCase(sub);

                const themeKey = `color_avatar_${subSnake}_${level}`.toLowerCase();
                for (const category of Object.values(themeMapping)) {
                    if (themeKey in category) {
                        const mappedToken = (category as any)[themeKey];
                        const result = resolve(mappedToken);
                        if (result) return result;
                    }
                }
            }
        }

        const normalizedToken = token.replace(/\//g, '_');

        // Check fallback theme mapping (legacy)
        for (const category of Object.values(themeMapping)) {
            if (normalizedToken in category) {
                const mappedToken = (category as any)[normalizedToken] as string;
                const result = resolve(mappedToken);
                if (result) return result;
            }
        }

        return undefined;
    };

    return resolve(tokenRef);
};

export const resolveColorToken = (tokenRef: string | undefined): string | undefined => {
    const data = resolveColorData(tokenRef);
    return data?.hex;
};

export const resolveSemanticToken = (semanticToken: string): { light: string, dark: string } => {
    const { semanticMapping } = designSystemData.colors;

    let themeToken: string | undefined = undefined;

    // Find the theme token that the semantic token maps to
    // semanticMapping structure is now Category -> Array<{ devToken, designToken, value }>
    for (const category of Object.values(semanticMapping)) {
        if (Array.isArray(category)) {
            const tokenObj = category.find((t: any) => t.devToken === semanticToken);
            if (tokenObj) {
                themeToken = tokenObj.value;
                break;
            }
        } else {
            // Fallback for object structure if mixed (shouldn't happen with new json)
            if (semanticToken in (category as any)) {
                themeToken = (category as any)[semanticToken] as string;
                break;
            }
        }
    }

    if (!themeToken) {
        return { light: '#FFFFFF', dark: '#000000' };
    }

    // Resolve the theme token to its actual hex value
    const resolvedData = resolveColorData(themeToken);
    const resolvedHex = resolvedData?.hex || '#CCCCCC';
    const resolvedHexDark = resolvedData?.hexDark || resolvedHex;

    return { light: resolvedHex, dark: resolvedHexDark };
};