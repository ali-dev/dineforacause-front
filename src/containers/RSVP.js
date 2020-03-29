import React, { Component } from "react";
// import StripeCheckout from "react-stripe-checkout";
import client from "../api/appSyncClient";
import gql from "graphql-tag";
import { addCharge } from "../graphql/mutations";
import { requestEventForView, requestDataForRSVP } from '../actions';
import { connect } from 'react-redux';
import Payment from "../components/Payment"

const mapStateToProps = state => {
  return {
    event: state.requestDataForRSVP.event, 
    guestId: state.requestDataForRSVP.guestId, 
    guest: state.requestDataForRSVP.guest, 
    
    isPending: state.requestDataForRSVP.isPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestEvent: (viewId, guestId) => dispatch(requestDataForRSVP(viewId, guestId))
  };
};

class RSVP extends Component {
  componentDidMount() {
    this.props.onRequestEvent(this.props.match.params.viewId, this.props.match.params.guestId);
  }

  // onToken = token => {
  //   client
  //     .mutate({
  //       mutation: gql(addCharge),
  //       variables: {
  //         token: JSON.stringify(token)
  //       }
  //     })
  //     .then(data => alert(`We are in business, ${data.email}`))
  //     .catch(e => console.log(`${e} token = ${JSON.stringify(token)}`));
  // };

  render() {
    const { event, guest, guestId, isPending  } = this.props;
    if (isPending === true) {
      return (<div></div>);
    } else {
    console.log(guestId);
    let causeDetails = {};
    if (event.causeDetails !== undefined) {
      causeDetails = JSON.parse(event.causeDetails);
    }
    const imagePath = "https://dfac-main.s3.amazonaws.com/app";
    return (
    <div className="App ">
      <header className="App-header ">
        <nav className="dt w-100  center bg-white o-90 mt0">
          <div className=" v-mid tr pa3 ">
            <a
              className="f8 fw6 hover-red  no-underline gray dn dib-ns pv2 ph3"
              href="/"
            >
              How it Works
            </a>
            <a
              className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3"
              href="/"
            >
              Causes
            </a>
            <a
              className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3"
              href="/"
            >
              Organizations
            </a>
            <a
              className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3"
              href="/"
            >
              Partners
            </a>
            <a
              className="f8 fw6 hover-red no-underline gray dib ml2 pv2 ph3 ba"
              href="/"
            >
              Sign Up
            </a>
          </div>
        </nav>
        <div className="">
          <header className="bb b--black-40 pv4 bg-white ">
            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 center">
              
              {event.eventName}
            </h3>
            
          </header>
          
          
            <article data-name="article-full-bleed-background" >
              
                <section className="bg-white w-80 center ">
                  <div className="fl w-60 pt5 pa3 pa2-ns   bg-white     ">
                  <h3 className="f3 green">Guest Details</h3>
                  <dl className="lh-title pa1 mt0">
                    <dt className="f8 b">Guest Name</dt>
                    <dd className="ml0 gray">{this.props.guest.name}</dd>
                    <dt className="f8 b mt2">Email</dt>
                    <dd className="ml0 gray">{this.props.guest.email}</dd>
                    
                  </dl>

                  <h3 className="f3 green">Event Details</h3>
                  <dl className="lh-title pa1 mt0">
                    <dt className="f8 b">Host Name</dt>
                    <dd className="ml0 gray">{event.hostName}</dd>
                    <dt className="f8 b mt2">When</dt>
                    <dd className="ml0 gray">{event.date} @ {event.time}</dd>
                    <dt className="f8 b mt2">Where</dt>
                    <dd className="ml0 gray">{event.location}</dd>
                    <dt className="f8 b mt2">Minimum Donation</dt>
                    <dd className="ml0 gray">${event.minDonation}</dd>
                    <dt className="f8 b mt2">Recommended Donation</dt>
                    <dd className="ml0 gray">${event.recommendedDonation}</dd>
                    <dt className="f8 b mt2">Event Details</dt>
                    <dd className="ml0 gray">{event.details}</dd>
                  </dl>


                  <section className="bg-white w-100   ">
                  <h3 className="f3 green">Cause Details</h3>
                    <div className="fl w-30 w-100-m w-50-l pa2">
                      <img
                        className="w-100 db outline black-10"
                        alt={causeDetails.image}
                        src={`${imagePath}/${causeDetails.image}`}
                      />

                      <dl className="mt2 f6 lh-copy tc">
                        <dt>{causeDetails.causeName}</dt>
                        <dd className="ml0 gray truncate w-100">
                          {causeDetails.organizationName}
                        </dd>
                      </dl>
                    </div>
                    <div className="fl w-700 w-50-m w-50-r pa2">
                      {causeDetails.details}
                    </div>
                    <div>
                      <br/>
                    
                      
                      
                    </div>
                    
                  </section>
                  
                  </div>
                  <div className="fl w-40 pt5 pa3 pa2-ns   bg-light-gray   ">
                  <Payment guestId={guestId} guest={guest} event={event} /> 
                  
                  </div>
                  
                  </section>
                  
                
            </article>
                       
        </div>
        
      </header>
    </div>
    )
    }
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSVP)
