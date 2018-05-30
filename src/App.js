import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import fetch from 'isomorphic-fetch';
import AnimatedNumber from 'react-animated-number';
import { summaryDonations } from './helpers';
import Card from './components/Card';
import Modal from './components/Modal';

injectGlobal`
  html, body, #root {
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'Circular Std Black';
    font-style: normal;
    font-weight: normal;
    src: local('Circular Std Black'), url('http://localhost:3000/CircularStd-Black.woff') format('woff');
  }

`
const MainContainer = styled.div`
  font-family: 'Circular Std Black', sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const CardsListContainer =  styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color:#5A5E6B;
`;

const Title =  styled.h1`
  font-size:40px;
  margin: 40px 0px auto;
  color:#5A5E6B;
  @media (max-width: 640px) {
    font-size:25px;
  }
  font-family: 'Circular Std Black'
`;

const AllDonations =  styled.p`
  font-size:20px;
  color:#5A5E6B;
  font-family: 'Circular Std Black'
`;


const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`;


const Img = styled.img`
  max-width: 100%;
  heigth: auto;
`;

/*const BtnPay =  styled.button.attrs({
  className: 'btn btn-outline-info',
})`
  width:60px;
`;*/

const TestH1 = styled.h1.attrs({
  className: 'lead text-muted',
})`
`;


export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();
      this.state = {
        charities: [],
        selectedAmount: 10,
      };
      this.resetMessage = this.resetMessage.bind(this);
    }

    /*toggleModal() {
      this.setState({
        modalIsOpen: !this.state.modalIsOpen
      });
    }*/

    resetMessage() {
        this.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: ``,
        });
    }

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
          self.setState({ charities: data }) });

      fetch('http://localhost:3001/payments')
        .then(function(resp) { return resp.json() })
        .then(function(data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount))),
          });
        })
    }


    render() {
      const self = this;
      const cardList = this.state.charities.map(function(item, i) {
        return (
          <Card i={i} item={item} key={i}/>
        );
      });

      const donate = this.props.donate;
      const message = this.props.message;

      return (
        <MainContainer id="MainContainer">

          <Modal show={this.props.message != '' } msg={message} id="modal"
            onClose={this.resetMessage}>
          </Modal>

          <Header>
            <Title>Omise Tamboon React</Title>

            <AllDonations>
              <AnimatedNumber
                    stepPrecision={0}
                    duration = {500}
                    value={donate}
                    formatValue={n => `All donations: ${n} $` }/>
            </AllDonations>

          </Header>

          <CardsListContainer>
            {cardList}
          </CardsListContainer>

        </MainContainer>
      );
    }
  },

);
