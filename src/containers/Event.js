import React, { Component } from 'react';
import Header from '../components/Header'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import FormStep from '../components/FormStep'
import { requestCause } from '../actions';
import CreateEventForm from '../forms/CreateEventForm'
const logger = createLogger()

const mapStateToProps = (state) => {
  return {
    cause: state.requestCause.cause,
    isPending: state.requestCause.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestCause: () => dispatch(requestCause())
  }
}

class Event extends Component {
  componentDidMount() {
    this.props.onRequestCause();
  }
  
  render(causeId) {
  	const { cause } = this.props;
  
    return (
    <div >
      <header className="App-header">
        <div >
	      <article data-name="article-full-bleed-background">
	      <div className="cf  Header-image-events" >
	        <div className="fl w-60 pa3 pa2-ns  black-70 f3  ">
	          <header className="bb b--black-70 pv2 bg-white">
	            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir ml2 mr2">Dine for a Cause</h3>
	          	<h4 className="f3 fw4 i lh-title mt0 ml2 mr2">Create Event</h4>  
	          </header>
	          <section className="bg-white o-90 measure-wide">
	               <div className="fl w-60 pt5  pb4 bg-white   ">
	               	{/*<CreateEventForm/>*/}
	               </div>
	          </section>
	        </div>
	      </div>
	    </article>
	    </div>
      </header>
    </div>
    
  	);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)