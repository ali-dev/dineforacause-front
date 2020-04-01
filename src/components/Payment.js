import React, {  Component } from "react";
import { Form, Dropdown, Radio } from "semantic-ui-react";
import { loadStripe } from "@stripe/stripe-js";
import client from "../api/appSyncClient";
import gql from "graphql-tag";
import { addCharge } from "../graphql/queries";
import trigger  from '../graphql/triggers'
import {AMOUNT_OPTIONS, RSVP_OPTIONS, CARD_ELEMENT_OPTIONS}  from "../utils/lists.js"

// import {trigger} from "../"
import { connect } from 'react-redux';

import {
  CardElement,
  Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import "./stripe.css";
// Custom styling can be passed to options when creating an Element.





const DEFAULT_STATE = {
  error: null,
  elements: null,
  cardComplete: false,
  processing: false,
  paymentMethod: null,
  email: "",
  phone: "",
  name: "",
  rsvp: "not_attending",
  amount: null,
  willDonate: true
};


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  toggle = () => {
    this.setState({willDonate: !this.state.willDonate})
  } 

  handleCCChange = (event) => {
    if (event.error) {
      this.setState({ "error": event.error.message });
      return;
    } else {
      this.setState({ "error": null });
    }

  };

  handleChange = (event, { name, value }) => {
    if (event.error) {
      alert(event.error.message);
      this.setState({ "error": event.error.message });
      return;
    } else {
      this.setState({ "error": null });
    }
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  // Handle form submission.
  handleSubmit = async e => {
    e.preventDefault();

    const { stripe, elements, event, guestId, guest } = this.props;
    alert(this.state.willDonate);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const newGuestInfo = {...this.props.guest};
    newGuestInfo.rsvp_status = this.state.rsvp;
    const guestData = {
      'eventId': event.id,
      'guestId': guestId,
      'guestDetails': JSON.stringify(newGuestInfo)
    }



    if (this.state.willDonate === true) {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        // amount: this.state.amount,
        card: cardElement
      });
      const { token } = await stripe.createToken(cardElement);
      // console.log(token);
      if (token) {
        // @todo: figure out how to send all of this through addCharge. Added placeholder params for now
        client
          .mutate({
            mutation: gql(addCharge),
            variables: {
              token: JSON.stringify(token),
              eventId: event.id,
              guestId: guestId,
              causeId: 'causeId', // @todo pass that from parent if needed
              amount: this.state.amount,
              rsvp: 'rsvp', // @rodo probably not needed if we pass guest
              guest: JSON.stringify(guest) // @todo update mutation if guest is needed
            }
          })
          .then(data => alert(`We are in business, ${data.email}`))
          .catch(e => console.log(`${e} token = ${JSON.stringify(token)}`));
        //   console.log("[PaymentMethod]", paymentMethod);
        } else if (error) {
          console.log("[error]", error);
          this.setState({ "error": error.message });
        }

    } else {
      // @todo: just redirect to thank you
    }
    

    // await trigger
    //   .addGuest(guestData)
    //   // @todo change addGuest response to return only this guest's info so it can be used in invitation
    //   .then(async (data)  => {
    //     // Get a reference to a mounted CardElement. Elements knows how
    //     // to find your CardElement because there can only ever be one of
    //     // each type of element.
        
    //   });
    
    
    

  };

  render() {
    // const stripe = useStripe();
    // const elements = useElements();
    const {
      error,
      willDonate,
      rsvp
      // processing,
      // paymentMethod,
      // name,
      // email,
      // phone
    } = this.state;
    return (  
      <div className="bg-light-gray w-100 center  ">
        <h3 className="f3 green">RSVP & Donate</h3>
        <form onSubmit={this.handleSubmit} className="payment-form">
          <section className="bg-light-gray w-100 center   ">
            <Form.Select
              onChange={this.handleChange}
              options={RSVP_OPTIONS}
              value={rsvp}
              placeholder="RSVP"
              name="rsvp"
              id="rsvp_input"
            />
             
            <br />
            <Radio label="Donating?" toggle checked={willDonate} onClick={this.toggle} value={this}/>
            <br />
            <br />
            <section hidden={!willDonate}>
            <CardElement 
              className=""
              id="card-element"
              options={CARD_ELEMENT_OPTIONS}
              onChange={this.handleCCChange}
            />
            
            
            <div className="card-errors bg-light-gray" role="alert">
              {error}
            </div>

            <Dropdown
              options={AMOUNT_OPTIONS}
              placeholder="Choose amount"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              fluid
              selection
            />
            </section>
            <div className="fl w-20 pt5 pa3 pa2-ns   bg-light-gray     ">
              <button className="pay-submit" type="submit">
                Submit
              </button>
            </div>
          </section>
        </form>
      </div>
    );
  }
}

const InjectedCheckoutForm = (data) => {
  return (
    <ElementsConsumer data={data} >
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} guest={data.guest} guestId={data.guestId} event={data.event} />
      )}
    </ElementsConsumer>
  );
};
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Payment = (data, ) => {
  return (
    <Elements stripe={stripePromise} >
      <InjectedCheckoutForm guest={data.guest} guestId={data.guestId} event={data.event} />
    </Elements>
  );
};
// export default connect(mapStateToProps)(Payment);
export default Payment;
