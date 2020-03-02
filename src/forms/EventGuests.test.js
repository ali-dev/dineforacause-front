import React from 'react';
import ReactDOM from 'react-dom';
import EventGuests from './EventGuests';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = Enzyme.shallow(<EventGuests eventId="123" />);
    

it('should append to guest list when a new guest is added ', () => {
    // const myMock = jest.fn();
    // const a = new myMock();
    // const b = {};
    // const trigger = myMock.bind(b);
    
    expect(wrapper.find('.attendees').text()).toBe("");
    
    wrapper.setState({ attendeeEmail: 'test@email.com', attendeeName: 'name' });
    // wrapper.find('#attendeeEmail').simulate('change', {target: {value: 'test@email.com'}});
    expect(wrapper.find('#attendeeEmail').prop('value')).toBe('test@email.com');
    expect(wrapper.find('#attendeeName').prop('value')).toBe('name');
    wrapper.find('#addGuestButton').simulate('click');
    const state = wrapper.state();
    
    expect(state.attendees.length).toEqual(1);
    
    expect(wrapper.find('.attendees').text()).not.toBe("");
    
  });

  it('should remove guest from list when remove button is clicked ', () => {
    
    
    wrapper.setState(
        { 
            attendeeEmail: 'test@email.com', 
            attendeeName: 'name',
            attendees: [{'guestId': {'email': 'email@email.com', 'name': 'name', 'status': 'created'}}] 
        }
    );
    expect(wrapper.find('.attendees').text()).not.toBe("");
    
    expect(wrapper.find('.removeGuestButton').length).toBe(1);
    
    
    wrapper.find('.removeGuestButton').simulate('click');

    expect(wrapper.find('.attendees').text()).toBe("");
    
  });