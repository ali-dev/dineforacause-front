import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Select, Step, Divider } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
// import { addEvent } from '../graphql/queries';
import { submitAddEventForm } from '../actions';

 const states = [
  {key: 'n', text: 'New York', value: 'New York City' },
  { key: 'm', text: 'Minnesota', value: 'Minnesota' },
  ];

  const countries = [
  {key: 'u', text: 'United States', value: 'United States' },
  { key: 'j', text: 'Jordan', value: 'Jordan' },
  ];


const mapStateToProps = (state) => {

  return {
  	  eventName: '',
      address: '',	
      date: '',
      time: '',
      country: '',
      state: '',
      zipCode: ''      
	  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event) => dispatch(submitAddEventForm(event.target.value))
  }
}

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      address: '',	
      date: '',
      time: '',
      country: '',
      state: '',
      zipCode: ''      
    };

  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }
  
 //  handleSubmit(event) {
 //    event.preventDefault();
 //    const data = new FormData(event.target);
 //    let object = {};
	// data.forEach((value, key) => {object[key] = value});
	// let json = JSON.stringify(object);
	// console.log(json)
	// console.log(object)
	// console.log(this.state);
	// submitAddEventForm(this.state)
    

 //  }

  componentDidMount() {
    // this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
    
  }
  render() {
  	const { cause, handleSubmit } = this.props;
    
    return (
    	<Form onSubmit={handleSubmit}>
	    <Form.Field required>
	      <label>Event Name</label>
	      <input  id='eventName' name='eventName' placeholder='Event Name' />
	    </Form.Field>
	    
	    <Form.Group widths='equal'>
		    <DateInput
	          name="date"
	          placeholder="Date"
	          iconPosition="left"
	          value={this.state.date}
	          onChange={this.handleChange}
	        />
	        <TimeInput
	          name="time"
	          placeholder="Time"
	          iconPosition="left"
	          value={this.state.time}
	          onChange={this.handleChange}
	        />
        </Form.Group>
        
	    <div className="ui divider"></div>
	    <Form.Field required>
	      <label>Address</label>
	      <input name="address" />
	    </Form.Field>

	    <Form.Select  
	        onChange={this.handleChange}
	    	options={countries}
	    	label='Country'
	    	name="country"
	    />
	    <Form.Group widths='equal'>
	    
	    <Form.Select 
		    	options={states}
		    	label='State'
		    	placeholder='State'
		    	name='state'
		    	onChange={this.handleChange}
	    />
	    <Form.Field>
	      <label>Zip Code</label>
	      <input id='zipCode' name='zipCode' placeholder='Enter Zip Code' />
	    </Form.Field>
	    
	    </Form.Group>
	    
	    <div className="ui divider"></div>
	    
	    <Form.Field>
	      <Checkbox label='I agree to the Terms and Conditions' />
	    </Form.Field>
	    <Button type='submit'  >Submit</Button>
	  </Form>
  
    )
  }
}

// export default CreateEventForm

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm)
