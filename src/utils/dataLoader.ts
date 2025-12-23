import colorPalette from '../data/color_palette.json';
import themeColorMapping from '../data/theme_color_mapping.json';
import semanticColorMapping from '../data/semantic_color_mapping.json';
import typographyStyles from '../data/typography_styles.json';
import spacingSystem from '../data/spacing_system.json';
import deviceResolutions from '../data/device_resolutions.json';
import breakpoints from '../data/breakpoints.json';
import mainLayouts from '../data/main_layouts.json';
import lineIcons from '../data/line_icons.json';
import filledIcons from '../data/filled_icons.json';
import illustrationIcons from '../data/illustration_icons.json';
import shadowTokens from '../data/shadow_tokens.json';
import iconFilenameMapping from '../data/icon_filename_mapping.json';

export const designSystemData = {
  colors: {
    palette: colorPalette,
    themeMapping: themeColorMapping,
    semanticMapping: semanticColorMapping,
  },
  typography: typographyStyles,
  spacing: spacingSystem,
  layout: {
    deviceResolutions: deviceResolutions,
    breakpoints: breakpoints,
    mainLayouts: mainLayouts,
  },
  icons: {
    line: lineIcons,
    filled: filledIcons,
    illustration: illustrationIcons,
    filenameMapping: iconFilenameMapping,
  },
  shadows: shadowTokens,
};