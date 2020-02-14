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
import RSVP from './containers/RSVP';
import EventView from './containers/EventView';
import EventManage from './containers/EventManage';
import registerServiceWorker from './registerServiceWorker';
import { requestCauses, requestCause, searchCauses, requestEventForView } from './reducers'

import './index.css';


import {BrowserRouter as Router, Route} from 'react-router-dom';


Amplify.configure(awsconfig);



const logger = createLogger()

const rootReducers = combineReducers({requestCauses, requestCause, searchCauses, requestEventForView})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))


const routing = (
  <Router>
      <Provider store={store}>	
      <Route exact={true} path="/" component={App} />
      <Route path="/event/create/:organizationId/:id" component={Event} />
      <Route path="/rsvp" component={RSVP} />
      <Route path="/event/view/:viewId" component={EventView} />
      <Route path="/event/manage/:editId" component={EventManage} />
      
      </Provider>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
export default withAuthenticator(App, true);
