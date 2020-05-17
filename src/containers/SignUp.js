import React, {Component} from "react";
import { Link, Redirect } from 'react-router-dom';
import { Form, Input } from "semantic-ui-react";
import { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
// import { Form, Input, Icon, Button, notification, Popover, Spin, Col, Row } from 'antd';

// Presentational 
// import FormWrapper from '../../Components/Styled/FormWrapper';

// App theme 
// import { colors } from '../../Themes/Colors';

// const passwordValidator = require('password-validator');

// create a password schema
// const schema = new passwordValidator();

// schema
//   .is()
//   .min(8)
//   .has()
//   .uppercase()
//   .has()
//   .lowercase()
//   .has()
//   .digits()
//   .has()
//   .symbols();
Auth.configure(awsconfig);

class SignUp extends Component {
  state = {
    confirmDirty: false,
    redirect: false,
    loading: false,
    email: '',
    password:''
  };


  handleChangeInput = event => {
    if (this.state.hasOwnProperty(event.target.name)) {
      this.setState({ [event.target.name]: event.target.value });
    //   this.props.onChange(event.target.name, event.target.value);
    }
  };


  handleSubmit = (event) => {
    event.preventDefault();

    // this.props.form.validateFieldsAndScroll((err: Error, values: UserFormData) => {

        let { password, email } = this.state;

        // show loader
        this.setState({ loading: true });

        Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            // name: ${fname} ${lname},
            // phone_number: phoneNumber
          }
        })
          .then((result) => {
              console.log(result);
            Auth.signIn(email, password).then((user) =>{
                localStorage.setItem(AUTH_USER_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken);
                console.log('success'); 
            })
            .catch((e) => {
                console.log(`Failed login ${e.message}`);
            }); 

            this.setState({ email });
          })
          .catch(err => {
            alert('fail');

            this.setState({
              loading: false
            });
          });
  
      
    
  };

//   handleConfirmBlur = (event: React.FormEvent<HTMLInputElement>) => {
//     const { value } = event.currentTarget;

//     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//   };

//   compareToFirstPassword = (rule: object, value: string, callback: (message?: string) => void) => {
//     const { form } = this.props;

//     if (value && value !== form.getFieldValue('password')) {
//       callback('Two passwords that you enter is inconsistent!');
//     } else {
//       callback();
//     }
//   };

//   validateToNextPassword = (rule: object, value: string, callback: (message?: string) => void) => {
//     const form = this.props.form;
//     const validationRulesErrors = schema.validate(value, { list: true });

//     if (value && this.state.confirmDirty) {
//       form.validateFields(['confirm'], { force: true });
//     }
//     if (validationRulesErrors.length > 0) {
//       callback(this.formatPasswordValidateError(validationRulesErrors));
//     }
//     callback();
//   };

//   formatPasswordValidateError = (errors: Array<string>) => {
//     for (let i = 0; i < errors.length; i++) {
//       if (errors[i] === 'min') {
//         return 'password length should be a at least 8 characters';
//       } else if (errors[i] === 'lowercase') {
//         return 'password should contain lowercase letters';
//       } else if (errors[i] === 'uppercase') {
//         return 'password should contain uppercase letters';
//       } else if (errors[i] === 'digits') {
//         return 'password should contain digits';
//       } else if (errors[i] === 'symbols') {
//         return 'password should contain symbols';
//       }
//     }
//   };

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { redirect, loading } = this.state;

    const title = 'Password Policy';
    const passwordPolicyContent = (
      <React.Fragment>
        <h4>Your password should contain: </h4>
        <ul>
          <li>Minimum length of 8 characters</li>
          <li>Numerical characters (0-9)</li>
          <li>Special characters</li>
          <li>Uppercase letter</li>
          <li>Lowercase letter</li>
        </ul>
      </React.Fragment>
    );

    return (
        <Form>
            <Form.Field required>
          <label>Email Address</label>
          <input
            onChange={this.handleChangeInput}
            // value={this.state.eventName}
            name="email"
            value={this.state.email}
            placeholder="Enter you email address"
          />
        </Form.Field>
        <Form.Field required>
          <label>password</label>
          <input
            type="password"
            value={this.state.password}
            
            onChange={this.handleChangeInput}
            // value={this.state.eventName}
            name="password"
            placeholder="Enter Password"
          />
        </Form.Field>
        <button type="submit" onClick={this.handleSubmit.bind(this)} >submit now</button>
        </Form>

    )
    
  }

  test() {
    AWSCognito.config.region = 'us-east-1'; //This is required to derive the endpoint

    var poolData = {
        UserPoolId: 'us-east-1_TcoKGbf7n',
        ClientId: '4pe2usejqcdmhi0a25jp4b5sh3'
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var attributeList = [];
    var dataEmail = {
        Name: 'email',
        Value: 'email@mydomain.com'
    };
    var authenticationData = {
        Username: 'username',
        Password: 'password',
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
   
    userPool.signUp(authenticationData.Username, authenticationData.Password, attributeList, null, function (err, result) {
        if (err) {
            alert(err);
            return;
        }
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var userData = {
            Username: authenticationData.Username,
            Pool: userPool
        };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
                console.log('idToken + ' + result.idToken.jwtToken);
                /*Return the result.idToken.jwtToken with the response*/
            },
            onFailure: function (err) {
                alert(err);
            },
   
        });
    });
  }
}



export default SignUp;