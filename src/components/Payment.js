import React, {  Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { loadStripe } from "@stripe/stripe-js";
import client from "../api/appSyncClient";
import gql from "graphql-tag";
import { addCharge } from "../graphql/queries";
import {AMOUNT_OPTIONS, RSVP_OPTIONS, CARD_ELEMENT_OPTIONS}  from "../utils/lists.js"

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
  willDonate: false
};



const mapStateToProps = state => {
  return {
    // event: state.event, 
    // guest: state.guestId, 
    // guest: state.requestDataForRSVP.guest, 
    
    // isPending: state.requestDataForRSVP.isPending
  };
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    // alert(props.guest)
    // alert(this.props.guestId)
    console.log(`AFTER PASSING GUEST:${JSON.stringify(props.guest)}`)
    console.log(`AFTER PASSING GUESTID:${JSON.stringify(props.guestId)}`)
    console.log(`AFTER PASSING EVENT:${JSON.stringify(props.event)}`)
  
    this.state = DEFAULT_STATE;
  }
  componentDidMount() {
    // console.log(`AFTER MOUNT GUEST:${JSON.stringify(this.props.guest)}`)
    // console.log(`AFTER MOUNT GUESTID:${JSON.stringify(this.props.guestId)}`)
    // console.log(`THIS IS THE EVENT: ${JSON.stringify(this.props)}`);
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
    if (name === "rsvp") {
      let willDonate = false;
      if (value === "attending" || value === "not_attending_donating") {
        willDonate = true;
      }
      this.setState({ "willDonate": willDonate });
    }
    // this.props.onChange(name , value);
  };

  // Handle form submission.
  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    console.log(JSON.stringify(this.props.event));
    alert(this.state.rsvp);

    // // Get a reference to a mounted CardElement. Elements knows how
    // // to find your CardElement because there can only ever be one of
    // // each type of element.
    // const cardElement = elements.getElement(CardElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   amount: this.state.amount,
    //   card: cardElement
    // });
    // const { token } = await stripe.createToken(cardElement);
    // if (token) {
    //   client
    //     .mutate({
    //       mutation: gql(addCharge),
    //       variables: {
    //         token: JSON.stringify(token)
    //       }
    //     })
    //     .then(data => alert(`We are in business, ${data.email}`))
    //     .catch(e => console.log(`${e} token = ${JSON.stringify(token)}`));
    // //   console.log("[PaymentMethod]", paymentMethod);
    // } else if (error) {
    //   console.log("[error]", error);
    //   this.setState({ "error": error.message });
    // }


  };

  render() {
    // const stripe = useStripe();
    // const elements = useElements();
    const {
      error,
      // willDonate,
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
              value={this.state.rsvp}
              placeholder="RSVP"
              name="rsvp"
              id="rsvp_input"
            />

            <br />

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

// const App = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };


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
  console.log(`BEFORE PASSING:${JSON.stringify(data)}`)
  return (
    <Elements stripe={stripePromise} >
      <InjectedCheckoutForm guest={data.guest} guestId={data.guestId} event={data.event} />
    </Elements>
  );
};
export default connect(mapStateToProps)(Payment);
// export default Payment;
