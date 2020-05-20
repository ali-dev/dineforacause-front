import React, { Component } from "react";
import { Form, Dropdown, Radio } from "semantic-ui-react";
import { loadStripe } from "@stripe/stripe-js";
import {client} from "../api/appSyncClient";
import gql from "graphql-tag";
import { addCharge } from "../graphql/queries";
import {
  AMOUNT_OPTIONS,
  RSVP_OPTIONS,
  CARD_ELEMENT_OPTIONS,
} from "../utils/lists.js";

import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import "./stripe.css";
const stripePromise = loadStripe("pk_test_uo2pgWCmS9OklnawX92zOec600IDnTkg42");

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
  willDonate: true,
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.state.rsvp = this.props.guest.rsvp_status;
  }

  toggle = () => {
    this.setState({ willDonate: !this.state.willDonate });
  };

  handleCCChange = (event) => {
    if (event.error) {
      this.setState({ error: event.error.message });
      return;
    } else {
      this.setState({ error: null });
    }
  };

  handleChange = (event, { name, value }) => {
    if (event.error) {
      alert(event.error.message);
      this.setState({ error: event.error.message });
      return;
    } else {
      this.setState({ error: null });
    }
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  // Handle form submission.
  handleSubmit = async (e) => {
    e.preventDefault();

    const { stripe, elements, event, guestId, guest } = this.props;
    const { amount, willDonate, rsvp } = this.state;
    // Stripe.js has not loaded yet. Make sure to disable. form submission until Stripe.js has loaded.
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const newGuestInfo = { ...guest };
    newGuestInfo.rsvp_status = rsvp;

    if (willDonate === true) {
      if (!amount) {
        this.setState({
          error: "If you are donating, you must complete payment info",
        });
        return;
      }
      newGuestInfo.donated = true;
      newGuestInfo.donation_amount = amount; //@todo add validation for amount

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        // amount: this.state.amount,
        card: cardElement,
      });
      if (error) return;
    }

    // todo remove
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   // amount: this.state.amount,
    //   card: cardElement
    // });

    // const { token } = await stripe.createToken(cardElement);

    // if (token) {
    //   params.token = JSON.stringify(token);
    // }
    //   console.log("[PaymentMethod]", paymentMethod);

    const params = {
      eventId: event.id,
      guestId: guestId,
      causeId: "causeId", // @todo pass that from parent if needed
      amount: amount,
      willDonate: willDonate,
      guest: JSON.stringify(newGuestInfo),
    };

    client
      .mutate({
        mutation: gql(addCharge),
        variables: params,
      })
      .then(async (response) => {
        const data = JSON.parse(response.data.addCharge.body);

        if (data.paymentIntent) {
          const result = await stripe.confirmCardPayment(
            data.paymentIntent.client_secret,
            {
              receipt_email: "ali@causeandcuisine.com",
              payment_method: {
                // customer: guestId,
                card: cardElement,
                type: "card",
                metadata: {
                  eventId: event.id,
                  guestId: guestId,
                  causeId: "causeId", // @todo update
                },
                billing_details: {
                  name: newGuestInfo.name,
                  email: newGuestInfo.email,
                },
              },
            }
          );

          // @TODO: show error message
          // if (result.error) {
          //   // Show error to your customer (e.g., insufficient funds)
          //   console.log(result.error.message);
          // } else {
          //   // The payment has been processed!
          //   if (result.paymentIntent.status === 'succeeded') {
          //     alert('Success');
          //     // Show a success message to your customer
          //     // There's a risk of the customer closing the window before callback
          //     // execution. Set up a webhook or plugin to listen for the
          //     // payment_intent.succeeded event that handles any business critical
          //     // post-payment actions.
          //   }
          // }
        }
        window.location.reload(false);
      })
      .catch((e) => console.log(`${e}`));
    // else if (error) {
    //   console.log("[error]", error);
    //   this.setState({ "error": error.message });
    // }
  };

  render() {
    // const stripe = useStripe();
    // const elements = useElements();
    const {
      error,
      willDonate,
      rsvp,
      // processing,
      // paymentMethod,
      // name,
      // email,
      // phone
    } = this.state;
    const donated = this.props.guest.donated;
    return (
      <div className="dtl-rgt rgt">
        <label class="container">
          Donate?
          <input type="checkbox" checked="checked" />
          <span className="checkmark"></span>
        </label>
        {/* <h3 className="f3 green">RSVP & Donate</h3> */}
        {/* className="payment-form" */}
        <form onSubmit={this.handleSubmit}>
          <aside class="event-part">
            <h6>RSVP & Donate</h6>
            {/* <section className="bg-light-gray w-100 center   "> */}
            <div class="form-group width-full">
              <div class="absolut-box">
                <Form.Select
                  onChange={this.handleChange}
                  options={RSVP_OPTIONS}
                  value={rsvp}
                  placeholder="RSVP"
                  name="rsvp"
                  id="rsvp_input"
                />
              </div>
            </div>
            <section hidden={!willDonate || this.props.guest.donated === true}>
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
            
            
            {/* <br /> */}
            {/* <Radio label="Donating?" toggle disabled={(donated === true)} checked={donated === true ? false : willDonate} onClick={this.toggle} value={this}/> */}
            {/* <br />
            <br /> */}

            
            <div className="fl w-20 pt5 pa3 pa2-ns   bg-light-gray     ">
              <button className="pay-submit" type="submit">
                Submit
              </button>
            </div>
            {/* </section> */}
          </aside>
        
        </form>
        
          
      </div>
    );
  }
}

const InjectedCheckoutForm = (data) => {
  return (
    <ElementsConsumer data={data}>
      {({ elements, stripe }) => (
        <CheckoutForm
          elements={elements}
          stripe={stripe}
          guest={data.guest}
          guestId={data.guestId}
          event={data.event}
        />
      )}
    </ElementsConsumer>
  );
};

// const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Payment = (data) => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm
        guest={data.guest}
        guestId={data.guestId}
        event={data.event}
      />
    </Elements>
  );
};
// export default connect(mapStateToProps)(Payment);
export default Payment;
