import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import EventDetails from "./EventDetails";
import EventDetailsView from "../components/EventDetailsView";

import EventGuests from "./EventGuests";
import trigger from "../graphql/triggers";
// import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    event: state.event,
    //   isPending: state.requestEventForEdit
  };
};

class EditEventForm extends Component {
  componentDidMount() {
    //@todo figure out how to pass event from parent to child
    // this.props.onRequestEvent(this.props.match.params.editId);
  }
  constructor(props) {
    super(props);
    this.state = this.props.eventToEdit;

    console.log(this.state);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history } = this.props;
    trigger.createEvent(this.state).then((data) => {
      history.push(`/event/manage/${data.data.addEvent.editId}`);
    });
  }

  render() {
    const cause = this.state.causeDetails;
    const causeDetails = JSON.parse(cause);
    const imagePath = "https://dfac-main.s3.amazonaws.com/app";
    return (
      <Form size="small">
        <section className="bg-white w-80 center  event-part">
          <EventDetails
            eventToEdit={this.state}
            onChange={this.handleFieldChange}
          />
        </section>
        <div class="form-group">
          <button type="submit" onClick={this.handleSubmit.bind(this)}>
            submit now
          </button>
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps)(EditEventForm);
// export default withRouter(EditEventForm);
