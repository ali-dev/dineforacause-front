// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, {useState, useEffect} from "react";
import currentUser from "../services/AuthService";
import { Redirect, Route } from "react-router-dom";
import { Auth } from 'aws-amplify';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState('pending');

  useEffect(() => {
    if (user === 'pending') {
      getUser();
    }
  }, []);
  const getUser = async () => {

    // let user = await currentUser();  
    // setUser(user);
    Auth.currentAuthenticatedUser().then((u) => {
        setUser(u);
        // alert(user);
    }).catch((e) => {
        setUser(false);
    });
    
    
  };
//   alert(user)
  if (user !== 'pending') {
    return (
    
        <Route
          {...rest}
          render={(props) =>
            // <Component {...props} />
            (user !== false) ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
      );      
  } else {
      //   return "";
//     <Redirect
//     to={{ pathname: "/login", state: { from: props.location } }}
//   />
      return (<div></div>);
  } 

};

export default PrivateRoute;
