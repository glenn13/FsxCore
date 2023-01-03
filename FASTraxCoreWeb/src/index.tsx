import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {RootState} from './store/rootReducer';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import App from './App';

const store = configureStore({} as RootState);
const mountNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
