import THEME from './constant';
import {DARK, LIGHT} from './presets';

export const getTheme = (themeName: string) => {
  switch (themeName) {
    case THEME.DARK:
      return DARK;
    default:
      return LIGHT;
  }
};
