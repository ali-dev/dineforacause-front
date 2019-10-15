import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'tachyons';

import App from './containers/App';
import Event from './containers/Event';
import registerServiceWorker from './registerServiceWorker';
import { requestCauses, requestCause, searchCauses } from './reducers'

import './index.css';


import {BrowserRouter as Router, Route} from 'react-router-dom';


Amplify.configure(awsconfig);



const logger = createLogger()

const rootReducers = combineReducers({requestCauses, requestCause, searchCauses})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))


const routing = (
  <Router>
    <div>
      <Provider store={store}>	
      <Route exact={true} path="/" component={App} />
      <Route path="/event/create/:organizationId/:id" component={Event} />
      </Provider>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
export default withAuthenticator(App, true);
