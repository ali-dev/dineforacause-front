import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventCauses from './EventCauses'
import EventDetails from './EventDetails'
import trigger from '../graphql/triggers'
import shortid from 'shortid';
import { withRouter } from 'react-router-dom';




class CreateEventForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cause: '',
            organizationId: '',
            // minDonation: '',
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

export default withRouter(CreateEventForm);
