import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Modal extends React.Component {
  render() {

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    //The background
    const BackdropStyle = styled.div`
      position:fixed;
      top:0;
      left:0;
      width:100%;
      min-height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index:1000;
    `;

    //The modal "window"
    const ModalStyle = styled.div`
      position:fixed;
      border: 1px solid rgba(0,0,0,.125);
      border-radius: .25rem;
      box-shadow:0 5px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
      background-color: white;
      color:#5A5E6B;
      width:250px;
      height:120px;
      left:50%;
      top:50%;
      margin-left:-125px;
      margin-top:-60px;
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
    `;

    const Btn = styled.button`
      background-color: white;
      border: 1px solid #1876c0;
      border-radius:3px;
      text-align: center;
      padding: 6px;
      display: inline-block;
      cursor: pointer;
      color: #1876c0;
      font-family: 'Raleway', sans-serif;
      font-size: 15px;
    `;


    return (
      <BackdropStyle id="modal">
        <ModalStyle>
          <p>{this.props.msg}</p>

            <Btn onClick={this.props.onClose}>
              Close
            </Btn>

        </ModalStyle>
      </BackdropStyle>
    );
  }
}

export default Modal;
