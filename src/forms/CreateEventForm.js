import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventCauses from './EventCauses'
import EventDetails from './EventDetails'
import createHistory from 'history/createBrowserHistory'
// require("history").createBrowserHistory as createHistory
// import { useHistory } from "react-router-dom";
const history = createHistory()
 // const states = [
 //  {key: 'n', text: 'New York', value: 'New York City' },
 //  { key: 'm', text: 'Minnesota', value: 'Minnesota' },
 //  ];

  // const countries = [
  // {key: 'u', text: 'United States', value: 'United States' },
  // { key: 'j', text: 'Jordan', value: 'Jordan' },
  // ];


 



class CreateEventForm extends Component {
  render() {
	  
    return (
		<Form size='small'>
		<section className="bg-white w-100  ">
  	               <div  className="fl w-50 pt5 pa3 pa2-ns   bg-white   ">
                    <h3 className="f3 green">Event Details</h3>
                      <EventDetails/>
                      
  	               </div>

                   <div className="fl w-50  pt5 o-90 pa3 pa2-ns  pb4 bg-white   ">
                    <h3 className="f3 green">Causes</h3>
                      <EventCauses/>
                   </div>
  	          </section>
		</Form>
    )
  }
}

export default CreateEventForm
