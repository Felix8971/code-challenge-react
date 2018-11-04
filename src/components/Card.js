import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

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

const BtnClose = styled.button`
  position:absolute;
  background-color: white;
  border: none;
  cursor: pointer;
  top:3px;
  right:3px;
  font-family: 'Raleway', sans-serif;
  opacity:0.8;
  width:25px;
  height:25px;
`;

const Name = styled.p`
    margin:8px 0 0 0;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    margin-bottom: 7px;
    text-align: center;
`;


const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  position: relative;
  margin: 20px;
  width: 500px;
  height: 280px;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  box-shadow:0 5px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;

  @media (max-width: 420px) {
    height: 220px;
  }
`;


const PaymentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items:center;
  position:absolute;
  opacity:0.9;
  background-color:white;
  width:101%;
  height:101%;
`;

const HomeCardContainer =  styled.div`
  top: 0;
  left: 0;
  right: 0;
  position:absolute;
  opacity:1;
`;

const Label = styled.label`
    display: block;
    position: relative;
    padding-left: 10px;
    margin-bottom: 12px;
    margin-right:8px;
    cursor: pointer;
    font-size: 15px;
    user-select: none;
`;

const Img = styled.img`
  max-width: 100%;
  heigth: auto;
`;

const InputContainer =  styled.div`
  display: flex;
  justify-content: center;
`;


const BtnPay = styled.button`
  display: flex;
  justify-content: center;
  width:60px;
`

const DonateFooter = styled.div`
  max-width: 100%;
  margin-top:15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const Test = styled.div`
  margin: 10px;
  border: 2px solid red;
`;

const TestH1 = styled.h1.attrs({
  className: 'lead text-muted',
})`
`;

export default connect((state) => state)( //link the component to the store

  class Card extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedAmount: 10,
        paymentCardVisible: false,
        selectedOption: 10,
      };

      this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event,amount) {
      console.log('value=',event.target.value);
      this.setState({
        selectedAmount: parseInt(event.target.value)
      });

    }


    render() {
      const self = this;

      console.log("\selectedAmount",this.state.selectedAmount );

      const inputs = [10, 20, 50, 100, 500].map((amount, j) => (
        <Label key={amount}>
          <input
              id={`${amount}_${self.props.i}`}
              value={this.props.value}
              type="radio"
              name={`payment_${amount}`}
              value={amount}
              checked={this.state.selectedAmount === parseInt(amount) }
              onChange={this.handleOptionChange} />
              {amount}
        </Label>

      ));

      function HomeCard(props) {
        return (
          <HomeCardContainer>
          <Img src={`images/${props.item.image}`} alt={props.item.name}/>
          <DonateFooter>
            <Name>{props.item.name}</Name>
            <Btn type="button" onClick={function() { self.setState({ paymentCardVisible: true })}} >Donate</Btn>
          </DonateFooter>
        </HomeCardContainer>
        );
      }

      function PaymentCard(props) {
        if (props.visible) {
          return (
            <PaymentCardContainer>
              <p>Select the amount to donate (USD)</p>
              <InputContainer>
                {inputs}
              </InputContainer>
              <Btn type="button" onClick={handlePay.call(self, props.item.id, self.state.selectedAmount, props.item.currency)}>Pay</Btn>
              <BtnClose type="button" onClick={function() { self.setState({ paymentCardVisible: false })}}>X</BtnClose>
            </PaymentCardContainer>
          );
        }else{
          return <div></div>
        }
      }

      return (
       <CardContainer key={self.props.i} >
         <HomeCard item={self.props.item} />
         <PaymentCard item={self.props.item} visible={self.state.paymentCardVisible} />
       </CardContainer>
      );
    }
  },

);


function handlePay(id, amount, currency) {

  const self = this;
  return function() {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
      .then(function(resp) { return resp.json(); })
      .then(function() {
        
        self.props.dispatch({//
          type: 'UPDATE_TOTAL_DONATE',
          amount,
        });
        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `Thanks for donate ${amount} USD!`,
        });
      });
  }
}

