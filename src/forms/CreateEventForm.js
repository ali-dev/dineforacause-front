import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const CreateEventForm = () => (
  <Form>
    <Form.Field>
      <label>Event Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Location</label>
      <input placeholder='Enter Address' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default CreateEventForm
