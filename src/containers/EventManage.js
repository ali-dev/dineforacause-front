import React, { Component } from "react";
import { connect } from "react-redux";
// import { createLogger } from 'redux-logger';
import { requestEventForEdit } from "../actions";
import EditEventForm from "../forms/EditEventForm";
import InnerHeader from '../components/InnerHeader'
// const logger = createLogger()

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
    
    return (
      <div className="App ">
        <InnerHeader />
        <div className="extra-div gry-bg"></div>
        <main >
        <div className="event-area ">
          <EditEventForm eventToEdit={event} />
        </div>
        </main>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventManage);
