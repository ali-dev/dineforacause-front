import React, { useState, Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  ElementsConsumer,
  CardAmountElement
} from "@stripe/react-stripe-js";
import "./stripe.css";
// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  base: {
    iconColor: "#c4f0ff",
    color: "#fff",
    fontWeight: 500,
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",

    ":-webkit-autofill": {
      color: "#fce883"
    },
    "::placeholder": {
      color: "#87BBFD"
    }
  },
  invalid: {
    iconColor: "#FFC7EE",
    color: "#FFC7EE"
  }
};
const rsvp = [
  { key: "attending", text: "I will attent", value: "attending" },
  {
    key: "not_attending_donating",
    text: "Can't make it but will donate",
    value: "not_attending_donating"
  },
  {
    key: "not_attending",
    text: "Can't make it this time",
    value: "not_attending"
  }
];

const amounts = [
  { key: "10", text: "$10", value: "10" },
  { key: "15", text: "$15", value: "15" },
  { key: "20", text: "$20", value: "20" },
  { key: "30", text: "$30", value: "30" },
  { key: "40", text: "$40", value: "40" },
  { key: "50", text: "$50", value: "50" },
  { key: "60", text: "$60", value: "60" },
  { key: "70", text: "$70", value: "70" },
  { key: "80", text: "$80", value: "80" },
  { key: "100", text: "$100", value: "100" },
  { key: "120", text: "$120", value: "120" },
  { key: "140", text: "$140", value: "140" },
  { key: "160", text: "$160", value: "160" },
  { key: "180", text: "$180", value: "180" },
  { key: "200", text: "$200", value: "200" }
];

const DEFAULT_STATE = {
  error: null,
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

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }
  // Handle real-time validation errors from the card Element.
  handleChange = event => {
    // const [error, setError] = useState(null);
    if (event.error) {
      this.setState({ ["error"]: event.error.message });
    } else {
      this.setState({ ["error"]: null });
    }
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
    if (name === "rsvp") {
      let willDonate = false;
      if (value === "attending" || value == "not_attending_donating") {
        willDonate = true;
      }
      this.setState({ ["willDonate"]: willDonate });
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

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    const {token} = stripe.createToken();
    alert(token);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      amount: this.state.amount,
      card: cardElement
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  render() {
    // const [error, setError] = useState(null);
    // const stripe = useStripe();
    // const elements = useElements();
    const {
      error,
      willDonate,
      processing,
      paymentMethod,
      name,
      email,
      phone
    } = this.state;
    return (
      <div className="bg-light-gray w-100 center  ">
        <h3 className="f3 green">RSVP & Donate</h3>
        <form onSubmit={this.handleSubmit} className="payment-form">
          <section className="bg-light-gray w-100 center   ">
            <Form.Select
              onChange={this.handleChange}
              options={rsvp}
              placeholder="RSVP"
              name="rsvp"
            />

            <br />

            <CardElement
              className=""
              id="card-element"
              options={CARD_ELEMENT_OPTIONS}
              onChange={this.handleChange}
            />

            <div className="card-errors bg-light-gray" role="alert">
              {error}
            </div>


            <Dropdown
              options={amounts}
              placeholder='Choose amount'
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

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

// POST the token ID to your backend.
async function stripeTokenHandler(token) {
  const response = await fetch("/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: token.id })
  });

  return response.json();
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm />
    </Elements>
  );
};

export default Payment;
