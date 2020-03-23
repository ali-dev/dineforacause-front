import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import trigger from '../graphql/triggers'
import { v4 as uuidv4 } from 'uuid';

class EventGuests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: [],
            attendeeEmail: '',
            attendeeName: '',
            eventId: null,
            eventName: null,
            hostName: null,
            hostEmail: null

        };


    }

    componentDidMount() {

        if (this.props.event) {
            this.setState({ "eventId": this.props.event.id });
            this.setState({ "eventName": this.props.event.eventName });
            this.setState({ "hostName": this.props.event.hostName });
            this.setState({ "hostEmail": this.props.event.hostEmail });
            this.setState({ "date": this.props.event.date });

        }


        if (this.props.attendees) {
            let self = this;
            const attendees = JSON.parse(this.props.attendees);
            Object.keys(attendees).map(function (key, val) {
                return self.state.attendees.push({ [key]: attendees[key] })
            });
        }
    }


    handleChangeInput = (event) => {
        if (this.state.hasOwnProperty(event.target.name)) {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    isValidEmail = (email) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false        
    }


    addGuest = () => {
        const allGuests = this.state.attendees;
        const guestName = this.state.attendeeName;
        const guestEmail = this.state.attendeeEmail;

        if (!this.isValidEmail(guestEmail)) {
            alert(`Email ${guestEmail} is not Valid`);
            return;
        }

        for (let i = 0; i < allGuests.length; i++) {
            const guest = allGuests[i];
            const guestId = Object.keys(guest)[0];
            if (guest[guestId].email === guestEmail) {
                alert(`Email ${guestEmail} already added`);
                return;
            }
        }

        const guestId = uuidv4();
        const attendee = {
            [guestId]: {
                'name': guestName,
                'email': guestEmail,
                'status': 'created',
                'rsvp_status': 'created'
            }
        }

        allGuests.push(attendee)
        this.setState({
            attendeeEmail: "",
            attendeeName: ""
        });

        const data = {
            'eventId': this.state.eventId,
            'guestId': guestId,
            'guestDetails': JSON.stringify({
                'name': guestName,
                'email': guestEmail,
                'status': 'created',
                'rsvp_status': 'created'
            })
        }
        trigger
            .addGuest(data)
        .then(data => {

            //history.push(`/event/manage/${data.data.addEvent.editId}`);
        })
    };


    sendInvitation = (key) => {
        const btnRef = `inviteBtnLoading-${key}`;
        this.setState({ [btnRef]: true })

        let allGuests = this.state.attendees;
        
        const guestId = Object.keys(allGuests[key])[0];
        const guest = allGuests[key][guestId];
        


        const eventData = {
            'eventId': this.state.eventId,
            'guestId': guestId,
            'guestDetails': JSON.stringify({
                'status': 'invited',
                'rsvp_status': 'pending',
                'email': guest.email,
                'name': guest.name
            })
        }

        trigger
            .addGuest(eventData)
            // @todo change addGuest response to return only this guest's info so it can be used in invitation
            .then(data => {
                //sends invitation email
                let emailData = {
                    'eventId': this.state.eventId,
                    'eventName': this.state.eventName,
                    'hostName': this.state.hostName,
                    'guestId': guestId,
                    'eventDetails': this.state.details,
                    'guestName': guest.name,
                    'guestEmail': guest.email,
                    'eventDate': this.state.date
                }
                trigger.sendInvitation(emailData).then(data => {
                    allGuests[key][guestId] = {
                            'name': guest.name,
                            'email': guest.email,
                            'status': 'invited',
                            'rsvp_status': 'pending'
                        };
                    this.setState({ [btnRef]: true })
                });
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
                    <Button size='tiny' ref={`inviteBtn-${key}`} loading={this.state[`inviteBtnLoading-${key}`]} color='green' onClick={() => this.sendInvitation(key)}>Send Invitation</Button>
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

                        <input onChange={this.handleChangeInput} name="attendeeName" ref="attendeeName" id="attendeeName" value={this.state.attendeeName} placeholder="Guest Name" />
                    </Form.Field>
                    <Form.Field required>
                        <input onChange={this.handleChangeInput} name="attendeeEmail" className="attendeeEmail" id="attendeeEmail" value={this.state.attendeeEmail} placeholder="Guest Email" />
                    </Form.Field>
                    <Form.Button content='Add' id="addGuestButton" className="addGuestButton" onClick={this.addGuest} />
                </Form.Group>
                <div className="attendees">
                    {this.state.attendees.map(function (item, key) {
                        const obkectKey = Object.keys(item)[0]
                        if(item[obkectKey].status === 'created' ) { 
                            return (
                                
                                <div  key={`attendee-${obkectKey}`}>
                                    <div className="ui divider fl w-100 pt5 pa3 pa2-ns"></div>
                                    <div className="fl w-30 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].name}</div>
                                    <div className="fl w-30 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].email}</div>
                                    {this.invitationButton(item[obkectKey].status, key)}
                                    <div className="fl w-20 pt5 pa3 pa2-ns   bg-white" >
                                        <Button className="removeGuestButton" size='tiny' color='red' icon='remove' onClick={() => this.removeAttendee(key)} />
                                    </div>
                                </div>

                            )
                        }
                    }, this)}
                    



                </div>
                <br/>    
                <div className='fl  w-100 '>
                    <h3 className="f3 green">Pending Guests</h3>   
                    <div className="attendees">
                    {this.state.attendees.map(function (item, key) {
                        const obkectKey = Object.keys(item)[0]
                        if(item[obkectKey].rsvp_status === 'pending' ) { 
                            return (
                                <div  key={`pending-guest-${obkectKey}`}>
                                    <div className="ui divider fl w-100 pt5 pa3 pa2-ns"></div>
                                    <div className="fl w-30 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].name}</div>
                                    <div className="fl w-30 pt5 pa3 pa2-ns   bg-white" >{item[obkectKey].email}</div>
                                </div>

                            )
                        }
                    }, this)}



                </div> 
                </div>
            </div>


        )
    }
}

export default EventGuests
