import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventDetails from './EventDetails'
import EventDetailsView from '../components/EventDetailsView'

import EventGuests from './EventGuests'
import trigger from '../graphql/triggers'
// import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
      event: state.event, 
    //   isPending: state.requestEventForEdit
    }
  }


class EditEventForm extends Component {
    componentDidMount() {
        //@todo figure out how to pass event from parent to child
        
        // this.props.onRequestEvent(this.props.match.params.editId);
      }
	constructor(props) {
        super(props);
        this.state = this.props.eventToEdit
        
        console.log(this.state);
        this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(name, value) {
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { history } = this.props;
		trigger
            .createEvent(this.state)
            .then(data => {
                history.push(`/event/manage/${data.data.addEvent.editId}`);
            })
	}
	
	render() {
        const cause = this.state.causeDetails;
        const causeDetails = JSON.parse(cause);
        const imagePath = "https://dfac-main.s3.amazonaws.com/app";
    
        return (
			<Form size='small'>
				<section className="bg-white w-80 center  event-part" >
					
					{/* <div className="fl w-100"> */}
						
            {/* <EventDetailsView eventToEdit={this.state} /> */}
						<EventDetails eventToEdit={this.state} onChange={this.handleFieldChange} />
                       
                        {/* <h3 className="f3 green">Cause Details</h3>
                        <div className="fl w-100 w-50-m w-50-l pa2">
                        
                        <img
                            className="w-100 db outline black-10"
                            alt="cause"
                            src={`${imagePath}/${causeDetails.image} `}
                        />
                        
                        <dl className="mt2 f6 lh-copy tc">
                            <dt className="clip">Title</dt>
                            <dd className="ml0 black truncate w-100">
                            {causeDetails.causeName}
                            </dd>
                            <dt className="clip">{causeDetails.causeName}</dt>
                            <dd className="ml0 gray truncate w-100">
                            {causeDetails.organizationName}
                            </dd>
                        </dl>
                        </div>
                        <div className="fl w-50 w-50-m w-50-r pa2">
                        {causeDetails.details}
                        </div>
                 */}
					{/* </div> */}
          </section>
          <div class="form-group">

<button type="submit" onClick={this.handleSubmit.bind(this)} >submit now</button>

</div>
				
			</Form>
		)
	}
}

export default connect(mapStateToProps)(EditEventForm);
// export default withRouter(EditEventForm);
