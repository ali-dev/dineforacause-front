import React, { Component } from 'react';
import { Button, Checkbox, Form, Select } from 'semantic-ui-react'

 const states = [
  {key: 'n', text: 'New York', value: 'New York City' },
  { key: 'm', text: 'Minnesota', value: 'Minnesota' },
  ];

  const countries = [
  {key: 'u', text: 'United States', value: 'United States' },
  { key: 'j', text: 'Jordan', value: 'Jordan' },
  ];

const CreateEventForm = () => (
 	
  <Form>
    <Form.Field required>
      <label>Event Name</label>
      <input />
    </Form.Field>
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
    
    
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default CreateEventForm
