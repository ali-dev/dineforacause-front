import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventCauses from './EventCauses'
import EventDetails from './EventDetails'
import createHistory from 'history/createBrowserHistory'
import trigger from '../graphql/triggers'
import shortid from 'shortid';
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

	constructor(props) {
		super(props);
		this.state = {
			cause: '',
            minDonation: '',
			recommendedDonation: '',
			viewId: shortid.generate(),
            editId: shortid.generate(),
			rsvpId: shortid.generate(),
			eventName: '',
            eventDetails: '',
            hostName: '',
            hostEmail: '',
            location: '',
            date: '',
			time: '',
			location: ''
            
        };
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(name, value) {
		this.setState({ [name]: value });
		console.log(this.state);
	}

	handleSubmit(event) {
        event.preventDefault();
		console.log(this.state);
        trigger
            .createEvent(this.state)
            .then(data => {
                console.log(data)
                history.push(`/event/view/${data.data.addEvent.viewId}`);
            })

	}
	
	render() {

		return (
			<Form size='small'>
				<section className="bg-white w-80 center  ">
					<div className="fl w-50 pt5 pa3 pa2-ns   bg-white   ">
						<h3 className="f3 green">Choose your Cause</h3>
						<EventCauses onChange={this.handleFieldChange} />
					</div>

					<div className="fl w-50  pt5 o-90 pa3 pa2-ns  pb4 bg-white   ">
						<h3 className="f3 green">Event Details</h3>
						<EventDetails onChange={this.handleFieldChange} />
					</div>
					 <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button>
				</section>
			</Form>
		)
	}
}

export default CreateEventForm
