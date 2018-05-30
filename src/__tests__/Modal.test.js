import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal';

describe('Modal', () => {
   it('renders without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<Modal show={true} msg={"Hello"}/>,  div);
   });
});