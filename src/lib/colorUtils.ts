import { designSystemData } from '../utils/dataLoader';

const colorResolverCache = new Map<string, string | undefined>();

export const resolveColorToken = (tokenRef: string | undefined): string | undefined => {
    if (!tokenRef || tokenRef.startsWith('#')) return tokenRef;
    if (colorResolverCache.has(tokenRef)) return colorResolverCache.get(tokenRef);

    const { palette, themeMapping } = designSystemData.colors;

    const resolve = (token: string): string | undefined => {
        if (!token || token.startsWith('#')) return token;
        if (colorResolverCache.has(token)) return colorResolverCache.get(token);

        // Handle "Family/Level" format (e.g. "brand/60" or "Blue/10")
        if (token.includes('/')) {
            const [family, level] = token.split('/');

            // 1. Check Direct Palette (Primitive)
            // Remove spaces from family name for key lookup (e.g. "Deep Green" -> "DeepGreen")
            const familyKey = family.replace(/\s/g, '');
            const colorFamily = (palette as any)[familyKey];
            if (colorFamily && Array.isArray(colorFamily)) {
                const shade = colorFamily.find(s => s.level.toString().trim() === level.toString().trim());
                if (shade?.hex) {
                    colorResolverCache.set(token, shade.hex);
                    return shade.hex;
                }
            }

            // 2. Check Theme Mapping (e.g. "brand/60" -> "color_brand_60")
            const themeKey = `color_${family}_${level}`.toLowerCase();
            for (const category of Object.values(themeMapping)) {
                if (themeKey in category) {
                    const mappedToken = (category as any)[themeKey];
                    const result = resolve(mappedToken);
                    if (result) {
                        colorResolverCache.set(token, result);
                        return result;
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
                if (result) {
                    colorResolverCache.set(token, result);
                    return result;
                }
            }
        }

        colorResolverCache.set(token, undefined);
        return undefined;
    };

    const finalHex = resolve(tokenRef);
    colorResolverCache.set(tokenRef, finalHex);
    return finalHex;
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
    const resolvedHex = resolveColorToken(themeToken) || '#CCCCCC';

    // For now, return the same color for both light and dark modes
    return { light: resolvedHex, dark: resolvedHex };
};