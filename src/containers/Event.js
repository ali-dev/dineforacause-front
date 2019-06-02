import React, { Component } from 'react';
import Header from '../components/Header'
import CreateEventForm from '../forms/CreateEventForm'



class Event extends Component {
  // componentDidMount() {
  //   this.props.onRequestCauses();
  // }

  render(causeId) {
  	
  	// const { causes, searchField, onSearchChange, isPending } = this.props;
    // const filteredCauses = causes.filter(cause => {
    //   return cause.title.toLowerCase().includes(searchField.toLowerCase());
    // })
    return (
    <div >
      <header className="App-header">
        <div >
	      <article data-name="article-full-bleed-background">
	      <div className="cf Header-image-events" >
	        <div className="fl pa3 pa4-ns  black-70 measure-narrow f3 times">
	          <header className="bb b--black-70 pv4 bg-white">
	            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir ml2 mr2">Dine for a Cause</h3>
	          	<h4 className="f3 fw4 i lh-title mt0 ml2 mr2">Create Event</h4>  
	          </header>

	          <section className="pt5 pb4 bg-white o-90">
	            <p className="times lh-copy measure f4 mt0 ml2 mr2">
	     	       <CreateEventForm/>
	                           
	            </p>

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

export default Event;