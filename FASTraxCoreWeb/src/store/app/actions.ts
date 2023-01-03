import {Theme, setTheme} from './types';
import {ReduxThunk} from './../rootReducer';

export const updateTheme = (theme: Theme): ReduxThunk => dispatch => {
  dispatch(setTheme(theme));
};
