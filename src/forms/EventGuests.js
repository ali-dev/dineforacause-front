import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import trigger from '../graphql/triggers'
import shortid from 'shortid';

class EventGuests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: [],
            attendeeEmail: '',
            attendeeName:'',
            eventId: null
        };

        
    }

    componentDidMount() {
        if (this.props.eventId) {
            this.setState({"eventId": this.props.eventId});
        }
        if (this.props.attendees) {
            let self = this;
            const attendees = JSON.parse(this.props.attendees);
            Object.keys(attendees).map(function(key, val) {
                self.state.attendees.push({[key]: attendees[key] })
            });
            // this.setState({"attendees": JSON.parse(this.props.attendees)});
        }
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
        const status = 'created';
        const rsvpStatus = 'pending';
        const guestId = shortid.generate();
        // attendees[this.state.attendeeEmail] = this.state.attendeeName;
        const attendee = {
            [guestId] :{
                'name': attendeeName,
                'email': attendeeEmail,
                'status': status,
                'rsvp_status': rsvpStatus 
            }
        }
        // console.log(attendee);
        attendees.push(attendee)
        this.setState({
            attendees: attendees,
            attendeeEmail: "",
            attendeeName: ""
        });
        
        const data = {
            'eventId': this.state.eventId, 
            'guestId': guestId,
            'guestDetails': JSON.stringify({
                'name': attendeeName,
                'email': attendeeEmail,
                'status': status,
                'rsvp_status': rsvpStatus
            })
        }
        trigger
            .addGuest(data)
            // .then(data => {
            //     //history.push(`/event/manage/${data.data.addEvent.editId}`);
            // })
    };

    removeAttendee = (key) => {
        let attendees = this.state.attendees;
        const guest = attendees[key];
        const guestId = Object.keys(guest)[0];

        const data = {
            'guestId': guestId,
            'eventId': this.state.eventId   
        }
        
        trigger.removeGuest(data)
        attendees.splice(key, 1)
        this.setState({
            attendees: attendees,
        });
    
    };


    
    render() {
        return (
            <div>
                {/* <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button> */}
                <h3 className="f3 green">Guests</h3>
                <Form.Group>
                    <Form.Field required>

                        <input onChange={this.handleChangeInput}  name="attendeeName" ref="attendeeName" id="attendeeName" value={this.state.attendeeName}  placeholder="Guest Name" />
                    </Form.Field>
                    <Form.Field required>
                        <input onChange={this.handleChangeInput}  name="attendeeEmail" className="attendeeEmail" id="attendeeEmail" value={this.state.attendeeEmail} placeholder="Guest Email" />
                    </Form.Field>
                    <Form.Button content='Add' id="addGuestButton" className="addGuestButton" onClick={this.addAttendee} />
                </Form.Group>
                <div className="attendees">

                    {this.state.attendees.map(function(item, key) {
                        const obkectKey = Object.keys(item)[0]
                        return (

                            <div key={`attendee-${obkectKey}`}>
                                <div className="ui divider fl w-100 pt5 pa3 pa2-ns"></div>
                                <div className="fl w-40 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].name}</div>
                                <div className="fl w-40 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].email}</div>
                                {/* <div className="fl w-20 pt5 pa3 pa2-ns   bg-white" > */}
                                {/* <Button size='tiny' color='green'>Send Invitation</Button> */}
                                {/* </div>     */}
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
