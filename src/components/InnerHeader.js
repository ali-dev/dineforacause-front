import React from 'react';
// import 'tachyons';

import logo from '../assets/images/logo.png'; 
import userIcon from "../assets/images/user(1).svg";
function InnerHeader() {
  return (
      
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
  
  );
}

export default InnerHeader;


