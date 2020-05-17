import React, {useState, useLayoutEffect} from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

// import 'tachyons';

import logo from '../assets/images/logo.png'; 
import userIcon from "../assets/images/user(1).svg";
import currentUser from "../services/AuthService";
function InnerHeader() {
  const [signout, setSignout] = useState(false);
  
  useLayoutEffect( () => {
  currentUser().then(() => {
    setSignout(true);
    // this.setState({signout: true})
  }).catch((error) => {
    setSignout(false);
    // this.setState({signout: false})
    
  })
  }, []);

  const signOut = () => {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
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
  {/* <a href="#" onClick={signOut()} className="btn rgt"><img   src={userIcon} alt="iamge" /><span>{signout === true ? "Sign Out" : "Sign Up"}</span></a> */}

    <div className="hamber-menu"><span></span><span></span><span></span></div>

    <div className="clear"></div>

    </div>
  </header>
  
  );
}

export default InnerHeader;


