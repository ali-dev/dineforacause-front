import React, { Component } from 'react';
import CreateEventForm from '../forms/CreateEventForm'
// import 'tachyons';
import 'tachyons/css/tachyons.min.css'
import logo from '../assets/images/logo.png'; 
import userIcon from "../assets/images/user(1).svg";

class Event extends Component {
  

  render() {
  	
    return (
    <div>
      <header className="inner_header">
        <div class="main-wrapper"><a class="lft logo" href="/"><img src={logo} alt="logo" /></a>
        <nav class="lft">

        <ul>

          <li><a href="#">About Us</a></li>

          <li><a href="#">Causes</a></li>

          <li><a href="#">Organizations</a></li>

          <li><a href="#">How it Works</a></li>

        </ul>

        </nav>
        <a href="#" class="btn rgt"><img src={userIcon} alt="iamge" /><span>Sign Up</span></a>

    <div class="hamber-menu"><span></span><span></span><span></span></div>

    <div class="clear"></div>

    </div>
  </header>
    <div class="extra-div gry-bg"></div>
    <main>
      <div className="event-area">
            {/* <div className=""> */}
              {/* <header className="bb b--black-40 pv4 bg-white">
                <h3   className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 ">Create Event</h3>
              </header> */}
              {/* <article data-name="article-full-bleed-background"> */}
                {/* <div className="cf" >
                  <div className="fl w-100   black-70 f3  "> */}
                  <CreateEventForm/>
                {/* </div>
              </div> */}
            {/* </article> */}
          {/* </div> */}
        </div>
      </main>
  </div>
        
      
    
  	);
  }
}

export default Event;