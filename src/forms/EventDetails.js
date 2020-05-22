import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import {TIME_LIST} from '../utils/lists';

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
        endTime: "",
        // maxCapacity: '',
        attendees: [],
        attendeeEmail: "",
        attendeeName: ""
      };
  
    if (this.props.eventToEdit) {
        this.state = this.props.eventToEdit
    }
    
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

  getLocationField = () => {
    if (parseInt(process.env.REACT_APP_COVID19) === 1) {
      return(<div></div>);
    } else {
      return(
        <div>
         <div className="ui divider"></div>
        <Form.TextArea 
            required
            label="Where"
            onChange={this.handleChangeInput}
            name="location"
            value={this.state.location}
            placeholder="Add an address or location"
          
        /> 
        </div>
      );
    }
  } 

  componentDidMount() {
    // this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <Form.Group widths="equal" className="form-group">
        <Form.Field required>
          <label>Event Name</label>
          <input
            onChange={this.handleChangeInput}
            value={this.state.eventName}
            name="eventName"
            placeholder="Add a short, clear name"
          />
        </Form.Field>
          <Form.Field required>
            <label>Your Name</label>
            <input onChange={this.handleChangeInput} value={this.state.hostName} name="hostName" />
          </Form.Field>
          <Form.Field required>
            <label>Email</label>
            <input onChange={this.handleChangeInput} value={this.state.hostEmail} name="hostEmail" />
          </Form.Field>
        
        
        </Form.Group>
        <Form.Group widths="equal" className="form-group">
          <Form.Field required>
            <label>Date</label>

            <DateInput
              closable
              name="date"
              iconPosition="left"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Start Time</label>

            <Dropdown
              selectOnNavigation={true}
              fluid
              search
              selection
              name="time"
              value={this.state.time}
              options={TIME_LIST}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>

            <Dropdown
              selectOnNavigation={true}
              fluid
              search
              selection
              name="endTime"
              value={this.state.endTime}
              clearable
              options={TIME_LIST}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        {this.getLocationField()}
        

        <div className="ui divider"></div>
        <Form.TextArea
          onChange={this.handleChangeInput}
          required
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
