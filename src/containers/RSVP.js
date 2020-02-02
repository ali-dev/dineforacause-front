import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import client from '../api/appSyncClient'
import gql from 'graphql-tag';
import {addCharge} from '../graphql/queries'
export default class RSVP extends React.Component {

  
  onToken = (token) => {
    client.mutate({
      mutation: gql(addCharge),
      variables: {
        token: JSON.stringify(token)
      }
    }).then(data => alert(`We are in business, ${data.email}`))
      .catch(e => console.log(`${e} token = ${JSON.stringify(token)}`))
  }
 
 
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