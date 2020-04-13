import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventCauses from './EventCauses'
import EventDetails from './EventDetails'
import trigger from '../graphql/triggers'
import { v4 as uuidv4 } from 'uuid';

import { withRouter } from 'react-router-dom';




class CreateEventForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cause: '',
            organizationId: '',
            // minDonation: '',
			recommendedDonation: '',
			viewId: uuidv4(),
            editId: uuidv4(),
			rsvpId: uuidv4(),
			eventName: '',
            eventDetails: '',
            hostName: '',
            hostEmail: '',
            location: '',
            date: '',
			time: '',
			endTime:'',
			guests: '{}'
        };
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(name, value) {
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { history } = this.props;
		trigger
            .createEvent(this.state)
            .then(data => {
                history.push(`/event/manage/${data.data.addEvent.editId}`);
            })
	}
	
	render() {
		return (
			
			// className="form-wrapper"
			<Form size='small' className="form-wrapper">
				<section className="event-part ">
					{/* <div className="fl w-100 pt5 pa3 pa2-ns   bg-white   "> */}
						<h3 className="h6 pa3">Choose your Cause</h3>
						<EventCauses onChange={this.handleFieldChange} />
					{/* </div> */}
				</section>
				<section className="bg-white w-100 center event-part ">
					<div className="fl w-100  pt5 o-90 pa3 pa2-ns  pb4 bg-white">
						<h3 className="h6 pa3">Event Details</h3>
						<EventDetails onChange={this.handleFieldChange} />
					</div>
					 <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button>
				</section>
			</Form>
		)
	}
}

export default withRouter(CreateEventForm);
