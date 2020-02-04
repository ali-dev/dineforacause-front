import React, { Component } from 'react';
import Header from '../components/Header'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import { requestEventForView } from '../actions';

const logger = createLogger()

const mapStateToProps = (state) => {
  return {
    event: state.requestEventForView.event,
    isPending: state.requestEventForView.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestEvent: (viewId) => dispatch(requestEventForView(viewId))
  }
}
  

class EventView extends Component {
  componentDidMount() {
    this.props.onRequestEvent(this.props.match.params.viewId);
    
  }
  render() {
  	const { event, isPending } = this.props;
    
    return (
    <div  className="App ">
      <header className="App-header ">
        <nav className="dt w-100  center bg-white o-90 mt0"> 
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
            <h3   className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 "> { event.location }</h3>
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
  	               <div  className="fl w-40 pt5 pa3 pa2-ns   bg-white   ">
  	               	  
  	               </div>

                   <div className="fl w-60  pt5 o-90 pa3 pa2-ns  pb4 bg-white   ">
                      <div>
                      <h2   className="f2 orange">Event</h2>
                       { event.location }
                       </div> 
                       <div>
                       { event.date }
                       </div> 
                       <div>
                       { event.time }
                       </div> 
                       <div>
                       { event.minDonation }
                       </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(EventView)