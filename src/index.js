import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'tachyons';

import App from './containers/App';
import Event from './containers/Event';
import registerServiceWorker from './registerServiceWorker';
import { requestCauses, searchCauses } from './reducers'

import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';


const logger = createLogger()

const rootReducers = combineReducers({requestCauses, searchCauses})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))


const routing = (
  <Router>
    <div>
      <Provider store={store}>	
      <Route exact={true} path="/" component={App} />
      <Route path="/event/:action/:causeId" component={Event} />
      </Provider>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
