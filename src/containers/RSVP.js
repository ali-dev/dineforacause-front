import React, { Component } from 'react';
import { requestDataForRSVP } from '../actions';
import { connect } from 'react-redux';
import Payment from '../components/Payment';
import { Message } from 'semantic-ui-react';
import EventDetailsView from '../components/EventDetailsView' 
import InnerHeader from '../components/InnerHeader'

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

  render() {
    const { event, guest, guestId, isPending } = this.props;

    if (isPending === true) {
      return (<div></div>);
    } else {
      if (!guest || !event) {
        window.location.href = '/';
      }
      let causeDetails = {};
      if (event.causeDetails !== undefined) {
        causeDetails = JSON.parse(event.causeDetails);
      }
      const imagePath = 'https://dfac-main.s3.amazonaws.com/app';
      return (
        <div className="App ">
          <InnerHeader />
          <div class="extra-div gry-bg"></div>
          <main>
          <div className="event-deatils-area">
        
          <EventDetailsView event={event} guest={guest} guestId={guestId} />
          <Payment guestId={guestId} guest={guest} event={event} />
          </div>
          
          
          </main>

              {/* <article data-name="article-full-bleed-background" >
                <Message icon='check circle' hidden={guest.rsvp_status === 'pending'}
                  success
                  header="You Responded to this event"
                  // content="You can change your status at any time"
                  list={[
                    guest.donated === true ? `You donated $${guest.donation_amount} to this cause` : 'You can still donate to this cause',
                    `You can change your status at any time; Your current status is ${(guest.rsvp_status === 'attending') ? 'Attending' : 'Not Attending'}`,
                  ]}
                /> */}
                {/* <section className="bg-white w-80 center ">
                  <div className="fl w-60 pt5 pa3 pa2-ns   bg-white     "> */}
                    


                    {/* <section className="bg-white w-100   ">
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
                        <br />



                      </div>

                    </section> */}

                  {/* </div>
                  <div className="fl w-40 pt5 pa3 pa2-ns   bg-light-gray   "> */}
                    {/* <Payment guestId={guestId} guest={guest} event={event} /> */}

                  {/* </div>

                </section>


              </article> */}

            </div>
      );
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSVP);
