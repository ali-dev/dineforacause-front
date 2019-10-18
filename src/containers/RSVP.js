import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class RSVP extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        name="Dine For A Cause" 
        panelLabel="Donate"
        stripeKey="pk_test_uo2pgWCmS9OklnawX92zOec600IDnTkg42"
      />
    )
  }
}