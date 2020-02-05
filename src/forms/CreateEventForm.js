import React, { Component } from 'react';
import { Button, Checkbox, Form, Select, Step, Divider } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { addEvent } from '../graphql/queries';
import  trigger  from '../graphql/triggers'
import { submitAddEventForm } from '../actions';
import  shortid  from 'shortid';

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

  const amounts = [
  {key: '10', text: '$10', value: '10' },
  {key: '15', text: '$15', value: '15' },
  {key: '20', text: '$20', value: '20' },
  {key: '30', text: '$30', value: '30' },
  {key: '40', text: '$40', value: '40' },
  {key: '50', text: '$50', value: '50' },
  {key: '60', text: '$60', value: '60' },
  {key: '70', text: '$70', value: '70' },
  {key: '80', text: '$80', value: '80' },
  {key: '100', text: '$100', value: '100' },
  {key: '120', text: '$120', value: '120' },
  {key: '140', text: '$140', value: '140' },
  {key: '160', text: '$160', value: '160' },
  {key: '180', text: '$180', value: '180' },
  {key: '200', text: '$200', value: '200' },
  ];

 



class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      location: '',	
      date: '',
      time: '',
      minDonation: '',
      recommendedDonation: '',
      maxCapacity: '',
      viewId: shortid.generate(),
      editId: shortid.generate(),
      rsvpId: shortid.generate(),
	  attendees: [],
	  attendeeEmail: '',
	  attendeeName: '',
	        
    };

  }

  

  handleChange = (event, {name, value}) => {
  	if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }
  

  handleChangeInput = (event ) => {
    if (this.state.hasOwnProperty(event.target.name)) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  

  handleSubmit(event) {
    event.preventDefault();
    
    trigger
		.createEvent(this.state)
		.then(data => {
			console.log(data)
			history.push(`/event/view/${data.data.addEvent.viewId}`);
		} )     

  }

  addAttendee = () => {
	const attendees = this.state.attendees;
	if (attendees[this.state.attendeeEmail]) {
		alert(`Email ${this.state.attendeeEmail} already added`); 
		return;
	}	
	attendees[this.state.attendeeEmail] = this.state.attendeeName;
	this.setState({
	  attendees: attendees,
	});
  };
  
  componentDidMount() {
    // this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
    
  }
  render() {
	  const { cause } = this.props;
	  
    return (
		<Form size='small'>
	    <Form.Field required>
	      <label>Event Name</label>
	      <input onChange={this.handleChangeInput}   name="eventName" placeholder="Event Name" />
	    </Form.Field>
	    
	    <Form.Group widths='equal'>
		    <DateInput
	          name="date"
	          placeholder="Date"
	          iconPosition="left"
	          value={this.state.date}
	          onChange={this.handleChange}
	        />
	        <TimeInput
	          name="time"
	          placeholder="Time"
	          iconPosition="left"
	          value={this.state.time}
	          onChange={this.handleChange}
	        />
        </Form.Group>
        
	    <div className="ui divider"></div>
	    <Form.Field required>
	      <label>Location</label>
	      <input onChange={this.handleChangeInput} name="location" />
	    </Form.Field>
	    {/*
	    <Form.Select  
	        onChange={this.handleChange}
	    	options={countries}
	    	label='Country'
	    	name="country"
	    />
	    <Form.Group widths='equal'>
	    
	    <Form.Select 
		    	options={states}
		    	label='State'
		    	placeholder='State'
		    	name='state'
		    	onChange={this.handleChange}
	    />
	    <Form.Field>
	      <label>Zip Code</label>
	      <input  onChange={this.handleChangeInput} id='zipCode' name='zipCode' placeholder='Enter Zip Code' />
	    </Form.Field>
	    
	    </Form.Group>*/}
	    
	    <div className="ui divider"></div>
	    <Form.Field>
		      <label>Max. number of guests </label>
		      <input onChange={this.handleChangeInput} id='maxCapacity' name='maxCapacity' placeholder='Enter Max Number of Guests' />
		    </Form.Field>

	    <Form.Group widths='equal'>
		     <Form.Select 
		    	options={amounts}
		    	label='Minimum Donation'
		    	placeholder='Minimum Donation'
		    	name='minDonation'
		    	value={this.state.minDonation}
		    	onChange={this.handleChange}
	    	/>	
		     <Form.Select 
		    	options={amounts}
		    	label='Recommended Donation'
		    	placeholder='Recommended Donation'
		    	name='recommendedDonation'
		    	value={this.state.recommendedDonation}
		    	onChange={this.handleChange}
	    	/>	

		    
        </Form.Group>

		{/* <Form.Field>
	      <Checkbox label='I agree to the Terms and Conditions' />
	    </Form.Field>
	     */}
		<div className="ui divider"></div>

	    {/* <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button> */}
		<h3 className="f3 green">Attendees</h3>
		<Form.Group>
		<Form.Field required>
			
			<input onChange={this.handleChangeInput}   name="attendeeName" value={this.state.attendeeName} placeholder="Attendee Name" />
		</Form.Field>
		<Form.Field required>
			<input onChange={this.handleChangeInput}  value={this.state.attendeeEmail} name="attendeeEmail" placeholder="Attendee Email" />
		</Form.Field>
		<Form.Button content='Submit' onClick={this.addAttendee} />
		</Form.Group>
		<div className="attendees"></div>
		</Form>

	  
    )
  }
}

export default CreateEventForm
