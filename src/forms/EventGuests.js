import React, { Component } from "react";
import {
  Button,
  Form,
  Tab,
  List,
  Table,
  Icon,
  Segment,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import trigger from "../graphql/triggers";
import { v4 as uuidv4 } from "uuid";

class EventGuests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      attendeeEmail: "",
      attendeeName: "",
      eventId: null,
      eventName: null,
      hostName: null,
      hostEmail: null,
      viewId: null,
    };
  }

  componentDidMount() {
    if (this.props.event) {
      this.setState({ eventId: this.props.event.id });
      this.setState({ viewId: this.props.event.viewId });
      this.setState({ eventName: this.props.event.eventName });
      this.setState({ hostName: this.props.event.hostName });
      this.setState({ hostEmail: this.props.event.hostEmail });
      this.setState({ date: this.props.event.date });
    }

    if (this.props.attendees) {
      let self = this;
      const attendees = JSON.parse(this.props.attendees);
      Object.keys(attendees).map(function (key, val) {
        return self.state.attendees.push({ [key]: attendees[key] });
      });
    }
  }

  handleChangeInput = (event) => {
    if (this.state.hasOwnProperty(event.target.name)) {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  isValidEmail = (email) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

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
        name: guestName,
        email: guestEmail,
        status: "created",
        rsvp_status: "created",
      },
    };

    allGuests.push(attendee);
    this.setState({
      attendeeEmail: "",
      attendeeName: "",
    });

    const data = {
      eventId: this.state.eventId,
      guestId: guestId,
      guestDetails: JSON.stringify({
        name: guestName,
        email: guestEmail,
        status: "created",
        rsvp_status: "created",
      }),
    };
    trigger.addGuest(data).then((data) => {
      //history.push(`/event/manage/${data.data.addEvent.editId}`);
    });
  };

  sendInvitation = (key) => {
    const btnRef = `inviteBtnLoading-${key}`;
    this.setState({ [btnRef]: true });

    let allGuests = this.state.attendees;

    const guestId = Object.keys(allGuests[key])[0];
    const guest = allGuests[key][guestId];

    const eventData = {
      eventId: this.state.eventId,
      guestId: guestId,
      guestDetails: JSON.stringify({
        status: "invited",
        rsvp_status: "pending",
        email: guest.email,
        name: guest.name,
      }),
    };

    const emailData = {
      viewId: this.state.viewId,
      eventName: this.state.eventName,
      hostName: this.state.hostName,
      guestId: guestId,
      eventDetails: this.state.details,
      guestName: guest.name,
      guestEmail: guest.email,
      eventDate: this.state.date,
    };
    trigger.sendInvitation(emailData).then((response) => {
      const data = JSON.parse(response.data.sendInvitation);

      if (data.statusCode !== 200) {
        this.setState({ [btnRef]: false });
        alert("An error occured while trying to invite guest");
        return;
      }
      trigger
        .addGuest(eventData)
        // @todo change addGuest response to return only this guest's info so it can be used in invitation
        .then((data) => {
          //sends invitation email
          allGuests[key][guestId] = {
            name: guest.name,
            email: guest.email,
            status: "invited",
            rsvp_status: "pending",
          };
          this.setState({ [btnRef]: false });
        });
    });
  };

  removeAttendee = (key) => {
    let attendees = this.state.attendees;
    const guest = attendees[key];
    const guestId = Object.keys(guest)[0];

    const data = {
      guestId: guestId,
      eventId: this.state.eventId,
    };

    trigger.removeGuest(data);
    attendees.splice(key, 1);
    this.setState({
      attendees: attendees,
    });
  };

  invitationButton(status, key) {
    if (status === "created") {
      return (
        <div>
          <a ref={`inviteBtn-${key}`} onClick={() => this.sendInvitation(key)}>
            <Icon disabled name="mail" />
            Send Invitation
            <Loader active={this.state[`inviteBtnLoading-${key}`]}></Loader>
          </a>
        </div>

        // <Button
        //   size="tiny"
        //   ref={`inviteBtn-${key}`}
        //   loading={this.state[`inviteBtnLoading-${key}`]}
        //   color="green"
        //   onClick={() => this.sendInvitation(key)}
        // >
        //   Send Invitation
        // </Button>
        // </div>
      );
    }
  }

  getGuestCount(type = "created") {
    const guestList = this.state.attendees.filter((item, key) => {
      const objectKey = Object.keys(item)[0];
      if (type === "created") {
        return item[objectKey].status === "created";
      }
      return item[objectKey].rsvp_status === type;
    });
    return guestList.length;
  }

  getGuestList(type = "pending") {
    return (
      <div className="attendees">
        <List divided relaxed>
          {this.state.attendees.map((item, key) => {
            const obkectKey = Object.keys(item)[0];
            if (item[obkectKey].rsvp_status === type) {
              return (
                <List.Item>
                  <List.Content floated="left">
                    {item[obkectKey].name}
                  </List.Content>
                  <List.Content>{item[obkectKey].email}</List.Content>
                </List.Item>
              );
            }
          })}
        </List>
      </div>
    );
  }
  render() {
    this.getGuestCount();
    const panes = [
      {
        menuItem: {
          key: "new",
          icon: "list",
          content: `Guests (${this.getGuestCount("created")})`,
        },
        render: () => (
          <Tab.Pane size="small">
            <div className="attendees">
              <Table>
                <Table.Body>
                  {this.state.attendees.map((item, key) => {
                    const obkectKey = Object.keys(item)[0];
                    if (item[obkectKey].status === "created") {
                      return (
                        <Table.Row>
                          <Table.Cell>{item[obkectKey].name}</Table.Cell>
                          <Table.Cell>{item[obkectKey].email}</Table.Cell>
                          <Table.Cell selectable positive>
                            {this.invitationButton(item[obkectKey].status, key)}{" "}
                          </Table.Cell>

                          <Table.Cell selectable error>
                            <a onClick={() => this.removeAttendee(key)}>
                              {" "}
                              <Icon disabled name="delete" /> Remove
                            </a>{" "}
                          </Table.Cell>
                          {/* 
                                <Table.Cell>
                                <Button className="removeGuestButton" size="tiny" color="red" onClick={() => this.removeAttendee(key)}>Remove</Button>
                                {this.invitationButton(item[obkectKey].status, key)}
                          </Table.Cell> */}
                        </Table.Row>
                      );
                    }
                  })}
                </Table.Body>
              </Table>
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "pending",
          icon: "clock",
          content: `Pending (${this.getGuestCount("pending")})`,
        },
        render: () => (
          <Tab.Pane size="small">{this.getGuestList("pending")}</Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "attending",
          icon: "thumbs up",
          content: `Attending (${this.getGuestCount("attending")})`,
          color: "green",
        },
        render: () => (
          <Tab.Pane size="small" color="green">
            {this.getGuestList("attending")}
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "not_attending",
          icon: "thumbs down",
          content: "Not Attending",
          color: "red",
        },
        render: () => (
          <Tab.Pane size="small" color="red">
            {this.getGuestList("not_attending")}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div className="w-100">
        {/* <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button> */}
        {/* <h3 className="f3 green">Guests</h3> */}
        <Form.Group>
          <Form.Field required>
            <input
              onChange={this.handleChangeInput}
              name="attendeeName"
              ref="attendeeName"
              id="attendeeName"
              value={this.state.attendeeName}
              placeholder="Guest Name"
            />
          </Form.Field>
          <Form.Field required>
            <input
              onChange={this.handleChangeInput}
              name="attendeeEmail"
              className="attendeeEmail"
              id="attendeeEmail"
              value={this.state.attendeeEmail}
              placeholder="Guest Email"
            />
          </Form.Field>
          <Form.Button
            content="Add"
            id="addGuestButton"
            className="addGuestButton"
            onClick={this.addGuest}
          />
        </Form.Group>
        <br />
        <Tab
          menu={{ inverted: false, attached: true, tabular: true }}
          panes={panes}
        />
      </div>
    );
  }
}

export default EventGuests;
