import React, { Component } from 'react';
import { Button, Form, } from 'semantic-ui-react'
import EventCauses from './EventCauses'
import EventDetails from './EventDetails'
import EventGuests from './EventGuests'
import trigger from '../graphql/triggers'
import shortid from 'shortid';
import { withRouter } from 'react-router-dom';
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
        console.log(this.state);
        const cause = this.state.causeDetails;
        const causeDetails = JSON.parse(cause);
        console.log(causeDetails);
        const imagePath = "https://dfac-main.s3.amazonaws.com/app";
    
        return (
			<Form size='small'>
				<section className="bg-white w-80 center  ">
					<div className="fl w-50 pt5 pa3 pa2-ns   bg-white   ">
						<EventGuests />
					</div>

					<div className="fl w-50  pt5 o-90 pa3 pa2-ns  pb4 bg-white   ">
						<h3 className="f3 green">Event Details</h3>
						<EventDetails eventToEdit={this.state} onChange={this.handleFieldChange} />
                        
                        <h3 className="f3 green">Cause Details</h3>
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
                
					</div>
					 <Button type='submit' onClick={this.handleSubmit.bind(this)} >Submit</Button>
				</section>
			</Form>
		)
	}
}

export default connect(mapStateToProps)(EditEventForm);
// export default withRouter(EditEventForm);
