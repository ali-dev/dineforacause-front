import React, { Component } from 'react';
import Header from '../components/Header'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import FormStep from '../components/FormStep'
import { requestCause } from '../actions';
import CreateEventForm from '../forms/CreateEventForm'
// import './App.css';
const logger = createLogger()

const mapStateToProps = (state) => {
  return {
    cause: state.requestCause.cause,
    isPending: state.requestCause.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestCause: (organizationId, id) => dispatch(requestCause(organizationId, id))
  }
}
  

class Event extends Component {
  componentDidMount() {
    this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
    
  }
  render() {
  	const { cause } = this.props;
    
    return (
    <div  className="App ">
      <header className="App-header ">
        <nav class="dt w-100  center bg-white o-90 mt0"> 
            <div  className=" v-mid tr pa3 ">
              <a className="f8 fw6 hover-red  no-underline gray dn dib-ns pv2 ph3" href="/" >How it Works</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Causes</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Organizations</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Partners</a>
              <a className="f8 fw6 hover-red no-underline gray dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
            </div>
          </nav>  
        <div className="">
          <header className="bb b--black-40 pv4 bg-white">
            <h3   className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 ">Create Event</h3>
          </header>
  	      <article data-name="article-full-bleed-background">
    	      <div className="cf  Header-image-events" >
    	        <div className="fl w-100   black-70 f3  ">
    	          {/*
                <header className="bb b--black-80 pv2 bg-white">
    	            <h4 style="font-family: 'Varela', sans-serif;" className="f3 fw6 i lh-title mt0 ml2 mr3 ">Create Event</h4>  
    	          </header>
                */}
  	          <section className="bg-white w-100  ">
  	               <div  className="fl w-30 pt5 pa3 pa2-ns   bg-white   ">
  	               	 <CreateEventForm/>
                      
  	               </div>

                   <div className="fl w-70  pt5 o-90 pa3 pa2-ns  pb4 bg-white   ">
                      <h2   className="f2 orange">Causes</h2>
                      {cause.causeName}
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