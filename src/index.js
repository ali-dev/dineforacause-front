import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


import App from './containers/OldApp';
import ComingSoon from './containers/ComingSoon';

import Event from './containers/Event';
import RSVP from './containers/RSVP';
import EventView from './containers/EventView';
import EventManage from './containers/EventManage';
import registerServiceWorker from './registerServiceWorker';
import { requestCauses, requestCause, searchCauses, requestEventForView, requestEventForEdit, requestDataForRSVP } from './reducers'

import { Router } from 'react-router';
import { Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';


// import "./assets/css/font-awesome.min.css";

// import "./assets/css/style.css";
// import "./assets/css/responsive.css";


const logger = createLogger()

const rootReducers = combineReducers({requestCauses, requestCause, searchCauses, requestEventForView, requestEventForEdit, requestDataForRSVP})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger)) //@todo disable logger in prod
const history = createBrowserHistory(); 

const isReleased = parseInt(process.env.REACT_APP_IS_RELEASED) === 1;


let routing = (
  <Provider store={store}>
  <Router history={history}>
      <Route exact={true} path="/" component={ComingSoon} />
  </Router>
  </Provider>
)

if (isReleased) {
  

  routing = (
    <Provider store={store}>
    <Router history={history}>
        <Route exact={true} path="/" component={App} />
        <Route path="/event/create/" component={Event} />
        <Route path="/rsvp/:viewId/:guestId" component={RSVP} />
        <Route path="/event/view/:viewId" component={EventView} />
        <Route path="/event/manage/:editId" component={EventManage} />
    </Router>
    </Provider>
  )
    
}


ReactDOM.render(routing, document.getElementById('root'));

// registerServiceWorker();
let componentToRender = App;
if (!isReleased) {
  componentToRender = ComingSoon;
}
// export default componentToRender; 
export default withAuthenticator(componentToRender, true);
