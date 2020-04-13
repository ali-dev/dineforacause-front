import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchField, requestCauses } from "../actions";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
// import {Link} from 'react-router-dom';
// import Header from '../components/Header'
// import CardList from '../components/CardList'
// import SearchBox from '../components/SearchBox'

import banner from '../assets/images/banner-img.jpg';
import logo from '../assets/images/logo.png';
import downImage from '../assets/images/down-img.png';
import stepOne from '../assets/images/step-1.png';
import stepTwo from '../assets/images/step-2.png';
import stepThree from '../assets/images/step-3.png';
import plate from '../assets/images/plate.png';
import aboutBg from '../assets/images/about-bg.png';
import aboutLeft from '../assets/images/abut-left-img.png';
import aboutMobile from '../assets/images/about-mobile-img.png';
import colorLine from '../assets/images/color-line.png';
import footerLogo from '../assets/images/footer-logo.png';
import userIcon from "../assets/images/user(1).svg";

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchCauses.searchField,
    causes: state.requestCauses.causes,
    isPending: state.requestCauses.isPending,
    };
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestCauses: () => dispatch(requestCauses()),
  };
};

class OldApp extends Component {
  constructor(props) {
		super(props)
		this.state = {
			headerClass: ''
		}
	}
  componentDidMount() {
    this.props.onRequestCauses();
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  handleScroll(event) {
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
    const { causes, searchField, onSearchChange } = this.props;

    // const filteredCauses = causes.filter((cause) => {
    //   return cause.details.toLowerCase().includes(searchField.toLowerCase());
    // });
    return (
      <div >
        <header className={this.state.headerClass}>
          <div className="main-wrapper">
            <a className="lft logo" href="index.html">
              <img src={logo} alt="logo" />
              {/* require("../assets/images/logo.png")  */}
            </a>

            <nav className="lft">
              <ul>
                <li>
                  <a href="http://www.google.com">About Us</a>
                </li>

                <li>
                  <a href="http://www.google.com">Causes</a>
                </li>

                <li>
                  <a href="http://www.google.com">Organizations</a>
                </li>

                <li>
                  <a href="http://www.google.com">How it Works</a>
                </li>
              </ul>
            </nav>

            <a href="/event/create" className="btn rgt">
              <img src={userIcon} alt="image" />
              <span>Create Event</span>
            </a>

            <div className="hamber-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="clear"></div>
          </div>
        </header>

        <section className="banner-area">
        {/* "assets/images/banner-img.jpg" */}
          <img
            src={banner} 
            alt="banner image"
          />

          <div className="shadow"></div>

          <div className="main-wrapper bannner-content">
            <h1>
              Eat. Fundraise.
              <br /> Change The World
            </h1>
          </div>

          <a href="javascript:void(0);" className="scroll-down">
            <img src={downImage} alt="image" />
          </a>
        </section>
     


<main>

<section className="how-it-work main-wrapper">

    	<h2>How it Works</h2>

        

        <figure>

        	<div className="icon-area">

            	<img src={stepOne} alt="icon" />

            </div>

            <figcaption>

            	<small>Step 1</small>

                <h3>Choose your causes</h3>

                <p>In a nutshell, Cause & Cuisine makes <br/> it easy for you to create and hold <br/> fundraising events. </p>

            </figcaption>

        </figure>

        <figure >

        	<div className="icon-area">

            	<img src={stepTwo} alt="icon" />

            </div>

            <figcaption>

            	<small>Step 2</small>

                <h3>Create your event </h3>

                <p>Events can be public or private, small  <br/>groups or large events. You can send  <br/>your invitations by email.</p>

            </figcaption>

        </figure>

        <figure>

        	<div className="icon-area">

            	<img src={stepThree} alt="icon" />

            </div>

            <figcaption>

            	<small>Step 3</small>

                <h3>Invite guests</h3>

                <p>You could host single events in support of <br/> multiple causes (up to three), and your <br/> guests can specify which causes.</p>

            </figcaption>

        </figure>

        <div className="clear"></div>

  </section>



{/* ABOUT US  */}
<section className="about-us">

<img className="plate" src={plate} alt="image" />

<img className="about-bg" src={aboutBg} alt="iamges" />

  <img className="heart-img" src={aboutLeft} alt="images" />

<img className="aboout-mobile" src={aboutMobile} alt="images" />

<div className="main-wrapper about-inner">

    <div className="about-rgt rgt">

          <small >About us</small>

      <h4 className="h4">Cause & Cuisine <br/>helps you fundraise </h4>

          <span>The causes that you care about!</span>

          <p >We truly believe that holding social events and dinner parties can be a powerful and organic way for grassroots groups and initiatives to support causes through community giving.</p>

          <a href="#" className="btn">Read More</a>

      </div>

      <div className="clear"></div>

  </div>

</section>





{/* // FEATURED CAUSES */}

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

  </div>
      // <div className="App">
      //   <header className="App-header">
      //     <Header />

      //   </header>
      //   <SearchBox searchChange={onSearchChange}/>
      //   <CardList causes={filteredCauses} />

      // </div>
    );
  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(OldApp);
