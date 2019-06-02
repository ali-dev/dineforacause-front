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
    <div className="App">
      <header className="App-header">
        <div className="Header">
	      <article data-name="article-full-bleed-background">
	      <div className="cf Header-image" >
	        <div className="fl pa3 pa4-ns bg-white black-70 measure-narrow f3 times">
	          <header className="bb b--black-70 pv4">
	            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir">Dine for a Cause</h3>
	          	<h4 className="f3 fw4 i lh-title mt0">Create Event</h4>  
	          </header>

	          <section className="pt5 pb4">
	            <p className="times lh-copy measure f4 mt0">
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