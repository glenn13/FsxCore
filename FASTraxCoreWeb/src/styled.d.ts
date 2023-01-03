import 'styled-components';
import BaseTheme from './presets/base';

type BaseThemeProps = typeof BaseTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends BaseThemeProps {}
}
