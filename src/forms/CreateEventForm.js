import React, { Component } from 'react';
import { Button, Checkbox, Form, Select, Step, Divider } from 'semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
 const states = [
  {key: 'n', text: 'New York', value: 'New York City' },
  { key: 'm', text: 'Minnesota', value: 'Minnesota' },
  ];

  const countries = [
  {key: 'u', text: 'United States', value: 'United States' },
  { key: 'j', text: 'Jordan', value: 'Jordan' },
  ];


// const handleChange = (event, {name, value}) => {
//     if (this.state.hasOwnProperty(name)) {
//       this.setState({ [name]: value });
//     }
//   }

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      date: '',
      time: '',
    };
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  componentDidMount() {
    // this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
    
  }
  render() {
  	const { cause } = this.props;
    
    return (
    	<Form>
	    <Form.Field required>
	      <label>Event Name</label>
	      <input />
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
	      <input  />
	    </Form.Field>

	    <Form.Field 
	    	control={Select} 
	    	options={countries}
	    	label='Country'
	    />
	    <Form.Group widths='equal'>
	    
	    <Form.Field 
	    	control={Select} 
	    	options={states}
	    	label='State'
	    	placeholder='State'
	    />
	    <Form.Field>
	      <label>Zip Code</label>
	      <input placeholder='Enter Zip Code' />
	    </Form.Field>
	    
	    </Form.Group>
	    
	    <div className="ui divider"></div>
	    
	    <Form.Field>
	      <Checkbox label='I agree to the Terms and Conditions' />
	    </Form.Field>
	    <Button type='submit'>Submit</Button>
	  </Form>
  
    )
  }
}

// const CreateEventForm = () => (
  
// 	  <Form>
// 	    <Form.Field required>
// 	      <label>Event Name</label>
// 	      <input />
// 	    </Form.Field>
	    
// 	    <Form.Group widths='equal'>
// 		    <DateInput
// 	          name="date"
// 	          placeholder="Date"
// 	          iconPosition="left"
// 	          value=""
// 	        />
// 	        <TimeInput
// 	          name="time"
// 	          placeholder="Time"
// 	          iconPosition="left"
// 	        />
//         </Form.Group>
        
// 	    <div className="ui divider"></div>
// 	    <Form.Field required>
// 	      <label>Address</label>
// 	      <input  />
// 	    </Form.Field>

// 	    <Form.Field 
// 	    	control={Select} 
// 	    	options={countries}
// 	    	label='Country'
// 	    />
// 	    <Form.Group widths='equal'>
	    
// 	    <Form.Field 
// 	    	control={Select} 
// 	    	options={states}
// 	    	label='State'
// 	    	placeholder='State'
// 	    />
// 	    <Form.Field>
// 	      <label>Zip Code</label>
// 	      <input placeholder='Enter Zip Code' />
// 	    </Form.Field>
	    
// 	    </Form.Group>
	    
// 	    <div className="ui divider"></div>
	    
// 	    <Form.Field>
// 	      <Checkbox label='I agree to the Terms and Conditions' />
// 	    </Form.Field>
// 	    <Button type='submit'>Submit</Button>
// 	  </Form>
  
  
// )

export default CreateEventForm
