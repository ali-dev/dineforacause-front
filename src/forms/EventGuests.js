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
            eventId: null,
            eventName: null,
            hostName: null,
            hostEmail: null

        };

        
    }

    componentDidMount() {
        
        if (this.props.event) {
            this.setState({"eventId": this.props.event.id});
            this.setState({"eventName": this.props.event.eventName});
            this.setState({"hostName": this.props.event.hostName});
            this.setState({"hostEmail": this.props.event.hostEmail});
        }
        
        if (this.props.attendees) {
            let self = this;
            const attendees = JSON.parse(this.props.attendees);
            Object.keys(attendees).map(function(key, val) {
                self.state.attendees.push({[key]: attendees[key] })
            });
            // this.setState({"attendees": JSON.parse(this.props.attendees)});
        }
        // console.log(this.state);
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


    sendInvitation = (key) => {
        let attendees = this.state.attendees;
        const guest = attendees[key];
        const guestId = Object.keys(guest)[0];
        
        const status = 'invited';
        const rsvpStatus = 'pending';
        // attendees[this.state.attendeeEmail] = this.state.attendeeName;
        const attendee = {
            [guestId] :{
                'name': attendees[key][guestId].name,
                'email': attendees[key][guestId].email,
                'status': status,
                'rsvp_status': rsvpStatus 
            }
        }
        
        
        const eventData = {
            'eventId': this.state.eventId, 
            'guestId': guestId,
            'guestDetails': JSON.stringify({
                'name': attendee[guestId].name,
                'email': attendee[guestId].email,
                'status': attendee[guestId].status,
                'rsvp_status': attendee[guestId].rsvp_status
            })
        }

        trigger
            .addGuest(eventData)
            // @todo change addGuest response to return only this guest's info so it can be used in invitation
            .then(data => {
                //@todo send invitation email
                let emailData = {
                    'eventId': this.state.eventId,
                    'eventName': this.state.eventName,
                    'hostName': this.state.hostName,
                    'guestId': guestId,
                    'eventDetails': this.state.details,
                    'guestName': eventData.guestDetails.name,
                    'guestEmail':  eventData.guestDetails.email,
                    'date': this.state.date
                }
                trigger.sendInvitation(emailData).then(data => {
                    attendees[key][guestId] = attendee[guestId];
                    this.forceUpdate();
                });                

                
                
                

                // arn:aws:lambda:us-east-1:395974092468:function:sendinblue-dev-sendEventCreatedEmail
            })
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

    invitationButton(status, key) {
        if (status === 'created') {
            return (
                <div className="fl w-20 pt5 pa3 pa2-ns   bg-white" > 
                    <Button size='tiny' color='green' onClick={() => this.sendInvitation(key)}>Send Invitation</Button>
                </div>    
                
            );
        }
        
    }
    
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
                                <div className="fl w-30 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].name}</div>
                                <div className="fl w-30 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].email}</div>
                                {this.invitationButton(item[obkectKey].status, key ) }
                                <div className="fl w-20 pt5 pa3 pa2-ns   bg-white" >
                                    <Button className="removeGuestButton" size='tiny' color='red' icon='remove' onClick={() => this.removeAttendee(key)} />
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
