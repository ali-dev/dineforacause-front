import React, { Component } from 'react';
import CreateEventForm from '../forms/CreateEventForm'
// import 'tachyons';
import 'tachyons/css/tachyons.min.css'
import logo from '../assets/images/logo.png'; 
import userIcon from "../assets/images/user(1).svg";
import eventCurve from "../assets/images/event-carv.png";
import colorLine from '../assets/images/color-line.png';
import footerLogo from '../assets/images/footer-logo.png';
class Event extends Component {
  

  render() {
  	
    return (
    <div>
      <header className="inner_header">
        <div className="main-wrapper"><a className="lft logo" href="/"><img src={logo} alt="logo" /></a>
        <nav className="lft">

        <ul>

          <li><a href="#">About Us</a></li>

          <li><a href="#">Causes</a></li>

          <li><a href="#">Organizations</a></li>

          <li><a href="#">How it Works</a></li>

        </ul>

        </nav>
        <a href="#" className="btn rgt"><img src={userIcon} alt="iamge" /><span>Sign Up</span></a>

    <div className="hamber-menu"><span></span><span></span><span></span></div>

    <div className="clear"></div>

    </div>
  </header>
    <div className="extra-div gry-bg"></div>
    <main >
      <div className="event-area ">
            {/* <div className=""> */}
              {/* <header className="bb b--black-40 pv4 bg-white">
                <h3   className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 ">Create Event</h3>
              </header> */}
              {/* <article data-name="article-full-bleed-background"> */}
                {/* <div className="cf" >
                  <div className="fl w-100   black-70 f3  "> */}
                  <CreateEventForm/>
                  <img className="event-carv" src={eventCurve} alt="iamgee"  />
                {/* </div>
              </div> */}
            {/* </article> */}
          {/* </div> */}
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