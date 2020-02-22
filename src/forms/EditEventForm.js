import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventCauses from './EventCauses'
import EventDetails from './EventDetails'
import EventGuests from './EventGuests'
import trigger from '../graphql/triggers'
import shortid from 'shortid';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
      event: state.event, 
    //   isPending: state.requestEventForEdit
    }
  }


class EditEventForm extends Component {
    componentDidMount() {
        //@todo figure out how to pass event from parent to child
        this.setState({ ["event"]: this.props.event });
        // this.props.onRequestEvent(this.props.match.params.editId);
      }
	constructor(props) {
        super(props);
        console.log(props);
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
			endTime:''
        };
        console.log(this.state);
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
						<EventGuests />
					</div>

					<div className="fl w-50  pt5 o-90 pa3 pa2-ns  pb4 bg-white   ">
						<h3 className="f3 green">Event Details</h3>
						<EventDetails onChange={this.handleFieldChange} />
                        <EventCauses onChange={this.handleFieldChange} />
					</div>
					 <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button>
				</section>
			</Form>
		)
	}
}

export default connect(mapStateToProps)(EditEventForm);
// export default withRouter(EditEventForm);
