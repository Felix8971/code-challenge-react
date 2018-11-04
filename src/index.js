import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';//store
import { Provider } from 'react-redux';//connection au store
import App from './App';

const raf = global.requestAnimationFrame = (cb) => {//to stop requestAnimationFrame warning
  setTimeout(cb, 0);
}

//We pass a function to CreateStore, this function is called a reducer, it takes state and action and return the next state
//of the app
const store = createStore(function(state, action) {
  const _state = state == null ? {
    donate: 0,
    message: '',
  } : state;

  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return Object.assign({}, _state, {//en va modifier que la proprieté donate dans la copy faite de l'objet _state
        donate: _state.donate + action.amount,
      });
    case 'UPDATE_MESSAGE':
      return Object.assign({}, _state, {
        message: action.message,
      });

    default: return _state;
  }
},  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

//on encapsule l'App avec le store
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
