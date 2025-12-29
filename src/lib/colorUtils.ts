import { designSystemData } from '../utils/dataLoader';

const colorResolverCache = new Map<string, string | undefined>();

export const resolveColorToken = (tokenRef: string | undefined): string | undefined => {
    if (!tokenRef || tokenRef.startsWith('#')) return tokenRef;
    if (colorResolverCache.has(tokenRef)) return colorResolverCache.get(tokenRef);

    const { palette, themeMapping } = designSystemData.colors;

    const resolve = (token: string): string | undefined => {
        if (!token || token.startsWith('#')) return token;
        if (colorResolverCache.has(token)) return colorResolverCache.get(token);

        const normalizedToken = token.replace(/\//g, '_');

        // Check theme mapping
        for (const category of Object.values(themeMapping)) {
            if (normalizedToken in category) {
                const mappedToken = (category as any)[normalizedToken] as string;
                
                // Let's check if the mapped token itself is a theme token (light/dark specific)
                const lightDarkMatch = mappedToken.match(/^(color_light|color_dark)_(.+)$/);
                if(lightDarkMatch) {
                    const result = resolve(mappedToken);
                    if (result) {
                        colorResolverCache.set(token, result);
                        return result;
                    }
                }
                
                const result = resolve(mappedToken);
                if (result) {
                    colorResolverCache.set(token, result);
                    return result;
                }
            }
        }
        
        // Check direct palette mapping
        const paletteMatch = normalizedToken.match(/^color_([A-Za-z\s]+)_(\S+)$/);
        if (paletteMatch) {
            const [, family, level] = paletteMatch;
            const familyKey = family.replace(/\s/g, '');
            const colorFamily = (palette as any)[familyKey];
            
            if (colorFamily && Array.isArray(colorFamily)) {
                const shade = colorFamily.find(s => s.level.toString().trim() === level.toString().trim());
                if (shade?.hex) {
                    colorResolverCache.set(token, shade.hex);
                    return shade.hex;
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

    let lightThemeToken: string | undefined = undefined;
    let darkThemeToken: string | undefined = undefined;

    for (const category of Object.values(semanticMapping)) {
        if (semanticToken in category) {
            const baseThemeToken = (category as any)[semanticToken] as string;
            lightThemeToken = baseThemeToken.replace('color_', 'color_light_');
            darkThemeToken = baseThemeToken.replace('color_', 'color_dark_');
            break;
        }
    }

    if (!lightThemeToken || !darkThemeToken) {
        return { light: '#FFFFFF', dark: '#000000' };
    }

    const lightHex = resolveColorToken(lightThemeToken) || '#FFFFFF';
    const darkHex = resolveColorToken(darkThemeToken) || '#000000';

    return { light: lightHex, dark: darkHex };
};