import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import client from '../api/appSyncClient'
import gql from 'graphql-tag';
import {addCharge} from '../graphql/queries'
export default class RSVP extends React.Component {

  
  // client.query({
  //   query: gql(getCauseInfo),
  //   variables: {
  //       organizationId: organizationId,
  //       id: id,
        
  //   }
  // }).then(data => dispatch({ type: REQUEST_CAUSE_SUCCESS, payload: data.data.getCauseInfo }))
  //   .catch(e => dispatch({ type: REQUEST_CAUSE_FAILED, payload: e }))


  onToken = (token) => {

    client.query({
      query: gql(addCharge),
      variables: {
        token: JSON.stringify(token)
      }
    }).then(data => alert(`We are in business, ${data.email}`))
      .catch(e => alert(e))

    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
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