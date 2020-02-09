import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { addEvent } from '../graphql/queries';
import trigger from '../graphql/triggers'

import shortid from 'shortid';
import EventGuests from './EventGuests'

import createHistory from 'history/createBrowserHistory'
// require("history").createBrowserHistory as createHistory
// import { useHistory } from "react-router-dom";
const history = createHistory()
const states = [
 {key: 'n', text: 'New York', value: 'New York City' },
 { key: 'm', text: 'Minnesota', value: 'Minnesota' },
 ];

const countries = [
{key: 'u', text: 'United States', value: 'United States' },
{ key: 'j', text: 'Jordan', value: 'Jordan' },
];






class CreateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDetails: '',
            location: '',
            date: '',
            time: '',
            maxCapacity: '',
            viewId: shortid.generate(),
            editId: shortid.generate(),
            rsvpId: shortid.generate(),
            attendees: [],
            attendeeEmail: '',
            attendeeName: '',

        };

    }



    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }


    handleChangeInput = (event) => {
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
            })

    }

    addAttendee = () => {
        const attendees = this.state.attendees;
        const attendeeName = this.state.attendeeName;
        const attendeeEmail = this.state.attendeeEmail
        if (attendees[this.state.attendeeEmail]) {
            alert(`Email ${this.state.attendeeEmail} already added`);
            return;
        }

        // attendees[this.state.attendeeEmail] = this.state.attendeeName;
        attendees.push({ attendeeName, attendeeEmail })
        this.setState({
            attendees: attendees,
            attendeeEmail: "",
            attendeeName: ""
        });
    };

    removeAttendee = (key) => {
        let attendees = this.state.attendees;
        attendees.splice(key, 1)
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
            <div>
                <Form.Field required>
                    <label>Event Name</label>
                    <input onChange={this.handleChangeInput} name="eventName" placeholder="Add a short, clear name" />
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
                    <label>Where</label>
                    <input onChange={this.handleChangeInput} name="location" placeholder="Address" />
                </Form.Field>
                
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
	    
	    </Form.Group>

                <div className="ui divider"></div>
                {/* <Form.Field>
                    <label>Max. number of guests </label>
                    <input onChange={this.handleChangeInput} id='maxCapacity' name='maxCapacity' placeholder='Enter Max Number of Guests' />
                </Form.Field> */}

                <Form.TextArea onChange={this.handleChangeInput} label='Description' name='eventDetails' value={this.state.eventDetails} placeholder='Tell guests what your event is about' />
        

                {/* <Form.Field>
	      <Checkbox label='I agree to the Terms and Conditions' />
	    </Form.Field>
	     */}

                {/* <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button> */}
                {/* { <EventGuests/> } */}

            </div>


        )
    }
}

export default CreateEventForm
