import React, { Component } from "react";
import { connect } from "react-redux";
// import { createLogger } from 'redux-logger';
import { requestEventForEdit } from "../actions";
import EditEventForm from "../forms/EditEventForm";
import InnerHeader from '../components/InnerHeader'
// const logger = createLogger()
import EventGuests from '../forms/EventGuests'
import { Tab, Form } from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    event: state.requestEventForEdit.event,
    isPending: state.requestEventForEdit,
    promiseIsResolved: false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestEvent: editId => dispatch(requestEventForEdit(editId))
  };
};




class EventManage extends Component {
  componentDidMount() {
    this.props.onRequestEvent(this.props.match.params.editId);
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     event: false,
  //   };
  // }
  render() {
    if (this.props.event === "test") {
      return null;
    }
    const { event } = this.props;
    const panes = [
      { menuItem: {key: 'guests-tab', icon: 'users', content: 'Invite Guests'},  render: () => <Tab.Pane size="small">
          <Form size='small'>
            <section className="bg-white  w-80 center  ">
              <div className=" pt5 pa3 pa2-ns   bg-white "> 
                <EventGuests event={event} eventId={event.id} attendees={event.guests} />
              </div>
          </section>
           </Form>
        </Tab.Pane> },
      { menuItem: {key: 'guests-tab', icon: 'edit', content: 'Edit Event'}, render: () => <Tab.Pane>
        <EditEventForm eventToEdit={event} />
        
        </Tab.Pane> }
    ]
    return (
      <div className="App ">
        <InnerHeader />
        
        <div className="extra-div gry-bg"></div>
        <main >
        
          <div className="event-area  ">
          
          <section class="mw5 mw8-ns center">
          
        <Tab 
           menu={{ color:'orange', inverted: true, attached: true, tabular: false }}
          panes={panes} 
        />
        </section>
        {/* <div className="event-area ">
          <EditEventForm eventToEdit={event} />
        </div> */}
        </div>
        </main>
        
      </div>
    );
    // return(<Tab panes={panes} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventManage);
