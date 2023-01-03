import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer, {RootState} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function configureStore(initialState: RootState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
