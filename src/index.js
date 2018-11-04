import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';//store
import { Provider } from 'react-redux';//connection au store
import App from './App';

const raf = global.requestAnimationFrame = (cb) => {//to stop requestAnimationFrame warning
  setTimeout(cb, 0);
}

const store = createStore(function(state, action) {//reducer function
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
