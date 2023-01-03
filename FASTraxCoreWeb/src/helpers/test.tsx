import React from 'react';
import {mount, shallow} from 'enzyme';
import {render} from '@testing-library/react';
import {ThemeProvider} from 'styled-components';
import BaseTheme from '@app/theme/presets/base';

export const ThemeProviderWrapper = (theme?: any) => ({children}: any) => (
  <ThemeProvider theme={theme || BaseTheme}>{children}</ThemeProvider>
);

export const mountWithTheme = (children: any, theme?: any) =>
  mount(children, {wrappingComponent: ThemeProviderWrapper(theme)});

export const renderWithTheme = (children: any, theme?: any) =>
  render(children, {wrapper: ThemeProviderWrapper(theme)});

export const shallowWithTheme = (children: any, theme?: any) =>
  shallow(children, {wrappingComponent: ThemeProviderWrapper(theme)});
