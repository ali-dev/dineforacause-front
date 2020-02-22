import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";

// @todo decide if we are going to use state/country
// const states = [
//     { key: 'n', text: 'New York', value: 'New York City' },
//     { key: 'm', text: 'Minnesota', value: 'Minnesota' },
// ];

// const countries = [
//     { key: 'u', text: 'United States', value: 'United States' },
//     { key: 'j', text: 'Jordan', value: 'Jordan' },
// ];

 const times = [
     { key: '7am', text: '7:00 AM', value: '7:00 AM' },
     { key: '730am', text: '7:30 AM', value: '7:30 AM' },
     { key: '8am', text: '8:00 AM', value: '8:00 AM' },
     { key: '830am', text: '8:30 AM', value: '8:30 AM' },
     { key: '9am', text: '9:00 AM', value: '9:00 AM' },
     { key: '930am', text: '9:30 AM', value: '9:30 AM' },
     { key: '10am', text: '10:00 AM', value: '10:00 AM' },
     { key: '1030am', text: '10:30 AM', value: '10:30 AM' },
     { key: '11am', text: '11:00 AM', value: '11:00 AM' },
     { key: '1130am', text: '11:30 AM', value: '11:30 AM' },
     { key: '12pm', text: '12:00 PM', value: '12:00 PM' },
     { key: '1230pm', text: '12:30 PM', value: '12:30 PM' },
     { key: '1pm', text: '1:00 PM', value: '1:00 PM' },
     { key: '130pm', text: '1:30 PM', value: '1:30 PM' },
     { key: '2pm', text: '2:00 PM', value: '2:00 PM' },
     { key: '230pm', text: '2:30 PM', value: '2:30 PM' },
     { key: '3pm', text: '3:00 PM', value: '3:00 PM' },
     { key: '330pm', text: '3:30 PM', value: '3:30 PM' },
     { key: '4pm', text: '4:00 PM', value: '4:00 PM' },
     { key: '430pm', text: '4:30 PM', value: '4:30 PM' },
     { key: '5pm', text: '5:00 PM', value: '5:00 PM' },
     { key: '530pm', text: '5:30 PM', value: '5:30 PM' },
     { key: '6pm', text: '6:00 PM', value: '6:00 PM' },
     { key: '630pm', text: '6:30 PM', value: '6:30 PM' },
 ];

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDetails: "",
      hostName: "",
      hostEmail: "",
      location: "",
      date: "",
      time: "",
      // maxCapacity: '',
      attendees: [],
      attendeeEmail: "",
      attendeeName: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, { name, value }) => { 
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
      this.props.onChange(name, value);
    }
  };

  handleChangeInput = event => {
    if (this.state.hasOwnProperty(event.target.name)) {
      this.setState({ [event.target.name]: event.target.value });
      this.props.onChange(event.target.name, event.target.value);
    }
  };

  addAttendee = () => {
    const attendees = this.state.attendees;
    const attendeeName = this.state.attendeeName;
    const attendeeEmail = this.state.attendeeEmail;
    if (attendees[this.state.attendeeEmail]) {
      alert(`Email ${this.state.attendeeEmail} already added`);
      return;
    }

    // attendees[this.state.attendeeEmail] = this.state.attendeeName;
    attendees.push({ attendeeName, attendeeEmail });
    this.setState({
      attendees: attendees,
      attendeeEmail: "",
      attendeeName: ""
    });
  };

  removeAttendee = key => {
    let attendees = this.state.attendees;
    attendees.splice(key, 1);
    this.setState({
      attendees: attendees
    });
  };

  componentDidMount() {
    // this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>Your Name</label>
            <input onChange={this.handleChangeInput} name="hostName" />
          </Form.Field>
          <Form.Field required>
            <label>Email</label>
            <input onChange={this.handleChangeInput} name="hostEmail" />
          </Form.Field>
        </Form.Group>
        <Form.Field required>
          <label>Event Name</label>
          <input
            onChange={this.handleChangeInput}
            name="eventName"
            placeholder="Add a short, clear name"
          />
        </Form.Field>

        <Form.Group widths="equal">
          <DateInput
            name="date"
            placeholder="Date"
            iconPosition="left"
            value={this.state.date}
            onChange={this.handleChange}
          />
          {/* <TimeInput
                        name="time"
                        placeholder="Time"
                        iconPosition="left"
                        value={this.state.time}
                        onChange={this.handleChange} */}
          {/* /> */}
          <Dropdown
            selectOnNavigation={true}
            fluid
            search
            selection
            placeholder="Time"
            name="time"
            options={times}
            onChange={this.handleChange}
          />
        </Form.Group>

        <div className="ui divider"></div>
        <Form.Field required>
          <label>Where</label>
          <input
            onChange={this.handleChangeInput}
            name="location"
            placeholder="Address"
          />
        </Form.Field>

       

        <div className="ui divider"></div>
        <Form.TextArea
          onChange={this.handleChangeInput}
          label="Description"
          name="eventDetails"
          value={this.state.eventDetails}
          placeholder="Tell guests what your event is about"
        />

        {/* <Form.Field>
	      <Checkbox label='I agree to the Terms and Conditions' />
	    </Form.Field>
	     */}

        {/* { <EventGuests/> } */}
      </div>
    );
  }
}

export default CreateEventForm;
