import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import trigger from '../graphql/triggers'



class EventGuests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: [],
            attendeeEmail: '',
            attendeeName:''
        };

    }


    handleChangeInput = (event ) => {
        if (this.state.hasOwnProperty(event.target.name)) {
          this.setState({ [event.target.name]: event.target.value });
        }
      }
    
    addAttendee = () => {
        const attendees = this.state.attendees;
        const attendeeName = this.state.attendeeName;
        const attendeeEmail = this.state.attendeeEmail;
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
        
        return (
            <div>
                {/* <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button> */}
                <h3 className="f3 green">Guests</h3>
                <Form.Group>
                    <Form.Field required>

                        <input onChange={this.handleChangeInput}  name="attendeeName" ref="attendeeName" value={this.state.attendeeName}  placeholder="Guest Name" />
                    </Form.Field>
                    <Form.Field required>
                        <input onChange={this.handleChangeInput}  name="attendeeEmail" id="attendeeEmail" value={this.state.attendeeEmail} placeholder="Guest Email" />
                    </Form.Field>
                    <Form.Button content='Add' onClick={this.addAttendee} />
                </Form.Group>
                <div className="attendees">

                    {this.state.attendees.map(function (item, key) {
                        return (

                            <div key={`attendee-${key}`}>
                                <div className="ui divider"></div>
                                <div className="fl w-40 pt5 pa3 pa2-ns   bg-white" >{item.attendeeName}</div>
                                <div className="fl w-40 pt5 pa3 pa2-ns   bg-white" >{item.attendeeEmail}</div>
                                <div className="fl w-20 pt5 pa3 pa2-ns   bg-white" >
                                    <Button size='small' color='red' icon='remove' onClick={() => this.removeAttendee(key)} />
                                </div>
                            </div>
                        )
                    }, this)}

                </div>
            </div>


        )
    }
}

export default EventGuests
