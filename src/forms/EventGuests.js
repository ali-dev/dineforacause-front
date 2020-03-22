import React, { Component } from 'react';
import { Button, Form, Loader} from 'semantic-ui-react'
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
            this.setState({"date": this.props.event.date});
            
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
    
    isValidEmail = (email) => { 
      {
       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
          return (true)
        }
          return (false)
      }  
    }
    addAttendee = () => {
        const attendees = this.state.attendees;
        const attendeeName = this.state.attendeeName;
        const attendeeEmail = this.state.attendeeEmail;

        
        if (!this.isValidEmail(attendeeEmail)) {
            alert(`Email ${attendeeEmail} is not Valid`);
            return;
        }

        for (let i = 0; i < attendees.length; i++) {
            const guest = attendees[i];
            const guestId = Object.keys(guest)[0];
            if (guest[guestId].email == attendeeEmail) {
                alert(`Email ${attendeeEmail} already added`);
                return;
            }
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
        const btnRef = `inviteBtnLoading-${key}`;
        this.setState({[btnRef]: true})
        
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
                'status': attendee[guestId].status,
                'rsvp_status': attendee[guestId].rsvp_status,
                'email': attendee[guestId].email,
                'name': attendee[guestId].name
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
                    'guestName': attendee[guestId].name,
                    'guestEmail':  attendee[guestId].email,
                    'eventDate': this.state.date
                }
                trigger.sendInvitation(emailData).then(data => {
                    attendees[key][guestId] = attendee[guestId];
                    this.setState({[btnRef]: true})    
                    this.forceUpdate();
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
                    <Button size='tiny'   ref={`inviteBtn-${key}`} loading={this.state[`inviteBtnLoading-${key}`]}color='green' onClick={() => this.sendInvitation(key)}>Send Invitation</Button>
                </div>    
                
            );
        }
        
    }
    
    render() {
        console.log(this.state.attendees);
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
                    <Form.Button content='Add' id="addGuestButton"  className="addGuestButton" onClick={this.addAttendee} />
                </Form.Group>
                <div className="attendees">

                    {this.state.attendees.map(function(item, key) {
                        const obkectKey = Object.keys(item)[0]
                        return (
                            // <Loader />
                            <div classNam="ui active transition visible dimmer" key={`attendee-${obkectKey}`}>
                                {/* <div class="content">
                                    <div class="ui loader active"></div>
                                </div> */}
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
