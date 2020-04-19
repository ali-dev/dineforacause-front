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
        {/* <header className="App-header "> */}
          {/* <nav className="dt w-100  center bg-white o-90 mt0">
            <div className=" v-mid tr pa3 ">
              <a
                className="f8 fw6 hover-red no-underline gray dib ml2 pv2 ph3 ba"
                href="/"
              >
                Home
              </a>
            </div>
          </nav> */}
          {/* <div className=""> */}
            {/* <header className="bb b--black-40 pv4 bg-white">
              <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 ">
                {" "}
                Manage Event
              </h3>
            </header> */}
            {/* <article data-name="article-full-bleed-background"> */}
              {/* <div className="cf"> */}
                {/* <div className="fl w-100   black-70 f3  "> */}
                  <EditEventForm eventToEdit={event} />
                  
                {/* </div> */}
                
              {/* </div> */}
                
            {/* </article> */}
          {/* </div> */}
        {/* </header> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventManage);
