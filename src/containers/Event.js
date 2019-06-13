import React, { Component } from 'react';
import Header from '../components/Header'
import FormStep from '../components/FormStep'
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
	      <div className="cf  Header-image-events" >
	        <div className="fl w-60 pa3 pa2-ns  black-70 f3  ">
	          <header className="bb b--black-70 pv2 bg-white">
	            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir ml2 mr2">Dine for a Cause</h3>
	          	<h4 className="f3 fw4 i lh-title mt0 ml2 mr2">Create Event</h4>  
	          </header>

	          <section className="bg-white o-90 measure-wide">
	               <div className="fl w-40 pt5  pb4 bg-white tc pv5 f3 ">
	               	<FormStep/>
	               </div>           
	            
	               <div className="fl w-60 pt5  pb4 bg-white   ">
	               	<CreateEventForm/>
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

export default Event;