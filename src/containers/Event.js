import React, { Component } from 'react';
import CreateEventForm from '../forms/CreateEventForm'
import InnerHeader from '../components/InnerHeader'

// import 'tachyons';
import 'tachyons/css/tachyons.min.css'
import eventCurve from "../assets/images/event-carv.png";
import colorLine from '../assets/images/color-line.png';
import footerLogo from '../assets/images/footer-logo.jpg';
// import { Auth } from 'aws-amplify';

class Event extends Component {
  


  render() {
    // let user = await Auth.currentAuthenticatedUser();
    // // console.log(Auth.currentAuthenticatedUser());
    // console.log(user);
    return (
    <div>
      <InnerHeader />
    <div className="extra-div gry-bg"></div>
    <main >
      <div className="event-area ">
                  <CreateEventForm/>
                  <img className="event-carv" src={eventCurve} alt="iamgee"  />
        </div>
      </main>

      {/* @todo Add Footer Component */}
      
<img src={colorLine} alt="line" className="colored-line" />

<footer>

  <div className="main-wrapper">

    <figure className="lft"> <a href="index.html"><img src={footerLogo} alt="image" /></a>

      <figcaption> <a href="#"><i className="fa fa-facebook"></i></a> <a href="#"><i className="fa fa-twitter"></i></a> <a href="#"><i className="fa fa-instagram"></i></a> </figcaption>

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

      <p>Events can be public or private, <br/>

        small groups or large events. You can <br/>

        send your invitations by email.</p>

      <a href="#" className="btn-new">join our community</a> </div>

    <div className="clear"></div>

    <div className="center-copy">

      <p>Copyright © 2020 Cause & Cuisine. All rights reserved.</p>

    </div>

  </div>

</footer>

<a className="scroll-top" href="javascript:void(0);"><i className="fa fa-caret-up"></i></a> 





  </div>
        
      
    
  	);
  }
}

export default Event;