export const typography = {
  // Primary brand font
  family: 'DMSans',
  
  // Hero impact font (Big numbers, centerpiece)
  hero: {
    regular: 'SquadaOne-Regular',
  },
  
  // Display styles (Headlines, titles)
  display: {
    bold: 'DMSans-Bold',
    extraBold: 'DMSans-ExtraBold',
  },
  // Body styles (Descriptions, dialogue)
  body: {
    regular: 'DMSans-Regular',
    medium: 'DMSans-Medium',
    italic: 'DMSans-Italic',
  },
  // Technical styles (Labels, timestamps)
  mono: {
    regular: 'DMSans-Regular',
    medium: 'DMSans-Bold',
  },
  // Legacy styles
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  caption: {
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
  },
} as const;
