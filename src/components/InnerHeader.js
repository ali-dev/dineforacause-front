import React, {useState, useLayoutEffect} from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import {Link} from 'react-router-dom';
// import 'tachyons';

import logo from '../assets/images/logo.png'; 
import userIcon from "../assets/images/user(1).svg";
import currentUser from "../services/AuthService";

const signOut = () => {
  Auth.signOut()
  .then(data => window.location.href="/")
  .catch(err => console.log(err));
}


function InnerHeader() {
  const [signout, setSignout] = useState(false);
  
  useLayoutEffect( () => {
  currentUser().then((u) => {
    setSignout(true);
    console.log(u)
    // this.setState({signout: true})
  }).catch((error) => {
    setSignout(false);
    // this.setState({signout: false})
    
  })
  }, []);

  
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
        {/* <AmplifySignOut/> */}
  <Link to="#" onClick={() => {signOut()}} className="btn rgt"><img   src={userIcon} alt="iamge" /><span>{signout === true ? "Sign Out" : "Sign Up"}</span></Link>

    <div className="hamber-menu"><span></span><span></span><span></span></div>

    <div className="clear"></div>

    </div>
  </header>
  
  );
}

export default InnerHeader;


