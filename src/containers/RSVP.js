import React, { Component } from 'react';
import { requestDataForRSVP } from '../actions';
import { connect } from 'react-redux';
import Payment from '../components/Payment';
import { Message } from 'semantic-ui-react';
import EventDetailsView from '../components/EventDetailsView' 
import InnerHeader from '../components/InnerHeader'
import footerLogo from '../assets/images/footer-logo.jpg';
import colorLine from '../assets/images/color-line.png';
import curve from '../assets/images/event-carv.png'
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

  handleScroll(event) {

    // if ($(this).scrollTop() > 200) {
    //   $('.scroll-top').fadeIn();
    // } else {
    //   $('.scroll-top').fadeOut();
    // }


    if (window.scrollY > 50) {
      this.setState({
        headerClass: 'fixed'
      });
    } else {
      this.setState({
        headerClass: ''
      });
    }
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
        <div>
          <InnerHeader />
          <div class="extra-div gry-bg"></div>
          <main>
          <div className="event-deatils-area">
          <div className="main-wrapper">
          <h1>RVSP</h1>
          
        
          <EventDetailsView event={event} guest={guest} guestId={guestId} />
          <Payment guestId={guestId} guest={guest} event={event} />
          {/* <div className="dtl-rgt rgt">
          <aside class="event-part"></aside>
          </div> */}
          <div className="clear"></div>
          
          </div>

          <img class="event-carv" src={curve} alt="iamgee"  />
          </div>
          </main>


<img src={colorLine} alt="line" className="colored-line" />  
<footer>

<div className="main-wrapper">

      <figure className="lft">

          <a href="index.html"><img src={footerLogo} alt="image" /></a>

          <figcaption>

              <a href="#"><i className="fa fa-facebook"></i></a>

              <a href="#"><i className="fa fa-twitter"></i></a>

              <a href="#"><i className="fa fa-instagram"></i></a>

          </figcaption>

      </figure>

      <div className="quick-link lft">

        <h5>Quick Link</h5>

          <ul>

            <li><a href="#">About Us</a></li>

              <li><a href="#">Causes</a></li>

              <li><a href="#">Organizations</a></li>

              <li><a href="#">How it Works</a></li>

          </ul>

      </div>

      <div className="footer-how lft">

          <h5>How It work</h5>

          <ul>

            <li><a href="#">Choose your causes</a></li>

              <li><a href="#">Create your event</a></li>

              <li><a href="#">Invite guests</a></li>

             

          </ul>

      </div>

      <div className="Community rgt">

          <h5>Join Our Community</h5>

          <p>Events can be public or private, <br/>small groups or large events. You can <br/>send your invitations by email.</p>

          <a href="#" className="btn-new">join our community</a>

      </div>

      <div className="clear"></div>

      

      <div className="center-copy"> <p>Copyright © 2020 Cause & Cuisine. All rights reserved.</p> </div>

  </div>

</footer>
<a className="scroll-top" href="javascript:void(0);"><i className="fa fa-caret-up"></i></a>

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
