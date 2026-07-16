import { Dimensions, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scale based on width
 */
export const s = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scale based on height
 */
export const vs = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Moderate scale
 */
export const ms = (size: number, factor = 0.5) => size + (s(size) - size) * factor;

/**
 * Moderate vertical scale
 */
export const mvs = (size: number, factor = 0.5) => size + (vs(size) - size) * factor;

// Aliases for clarity if preferred
export const widthScale = s;
export const heightScale = vs;
export const moderateScale = ms;
export const fontScale = ms;

type StyleValue = string | number | undefined | null;
type AllStyles = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = { [P in keyof T]: AllStyles };

const scaleFunc = (value: StyleValue): StyleValue => {
  if (typeof value !== 'string') {
    return value;
  }

  const [sizeStr, scaleType] = value.split('@');
  if (!scaleType) {
    return value;
  }

  const size = Number.parseFloat(sizeStr);
  if (Number.isNaN(size)) {
    return value;
  }

  if (scaleType === 's') {
    return s(size);
  }
  if (scaleType === 'vs') {
    return vs(size);
  }
  if (scaleType.startsWith('ms')) {
    const factor = scaleType.length > 2 ? Number.parseFloat(scaleType.substring(2)) : undefined;
    return ms(size, factor);
  }
  if (scaleType.startsWith('mvs')) {
    const factor = scaleType.length > 3 ? Number.parseFloat(scaleType.substring(3)) : undefined;
    return mvs(size, factor);
  }

  return value;
};

/**
 * A utility to create scaled stylesheets similar to react-native-size-matters
 * Supports '@s', '@vs', '@ms', and '@mvs' suffixes.
 */
export const ScaledSheet = {
  create: <T extends NamedStyles<T>>(styles: T): T => {
    const scaledStyles = {} as { [P in keyof T]: AllStyles };

    for (const key in styles) {
      const style = { ...styles[key] };
      for (const prop in style) {
        const value = (style as Record<string, StyleValue>)[prop];
        if (typeof value === 'string' || typeof value === 'number') {
          (style as Record<string, StyleValue>)[prop] = scaleFunc(value);
        }
      }
      scaledStyles[key] = style;
    }

    return StyleSheet.create(scaledStyles) as T;
  },
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };
