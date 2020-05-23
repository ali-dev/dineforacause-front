import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react';
import EventCauses from './EventCauses';
import EventDetails from './EventDetails';
import trigger from '../graphql/triggers';
import { v4 as uuidv4 } from 'uuid';

import { withRouter } from 'react-router-dom';
import config from 'react-global-configuration';




class CreateEventForm extends Component {

	constructor(props) {
		super(props);
		this.siteSettings = config.get('siteSettings');;
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

	async handleSubmit(event) {
		// alert(1);
		event.preventDefault();
		
		const { history } = this.props;
		
		const eventTrigger = this.siteSettings.getCreateEventTrigger;
		eventTrigger(this.state)
			.then((data) => {
				history.push(`/event/manage/${this.state.editId}`);
			}); 
	}
	
	render() {
		return (
			
			// className="form-wrapper"
			<Form size='small' className="form-wrapper">
				<section className="event-part ">
						<h3 className="h6 pa3">Choose your Cause</h3>
						<EventCauses onChange={this.handleFieldChange} />
				</section>
				<section className="event-part ">
						<h3 className="h6 pa3">Event Details</h3>
						<EventDetails onChange={this.handleFieldChange} />
				</section>
				
				<div class="form-group">

					<button type="submit" onClick={this.handleSubmit.bind(this)} >submit now</button>

				</div>
			</Form>
		)
	}
}

export default withRouter(CreateEventForm);
