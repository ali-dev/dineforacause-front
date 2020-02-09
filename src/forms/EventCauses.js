import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form, } from 'semantic-ui-react'
import { setSearchField, requestCauses } from '../actions';
import EventGuests from './EventGuests';

const amounts = [
    { key: '10', text: '$10', value: '10' },
    { key: '15', text: '$15', value: '15' },
    { key: '20', text: '$20', value: '20' },
    { key: '30', text: '$30', value: '30' },
    { key: '40', text: '$40', value: '40' },
    { key: '50', text: '$50', value: '50' },
    { key: '60', text: '$60', value: '60' },
    { key: '70', text: '$70', value: '70' },
    { key: '80', text: '$80', value: '80' },
    { key: '100', text: '$100', value: '100' },
    { key: '120', text: '$120', value: '120' },
    { key: '140', text: '$140', value: '140' },
    { key: '160', text: '$160', value: '160' },
    { key: '180', text: '$180', value: '180' },
    { key: '200', text: '$200', value: '200' },
];

const mapStateToProps = (state) => {

    return {
        causeList: state.requestCauses.causes,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      onRequestCauses: () => dispatch(requestCauses())
    }
  }

class EventCauses extends Component {
    
    
        
    constructor(props) {
        super(props);
        this.state = {
            cause: '',
            causeList: [],
            minDonation: '',
            recommendedDonation: '',
        };
    }

    componentDidMount() {
        this.props.onRequestCauses();
        
    }

    


    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    render() {
        
        const { causeList } = this.props;
        console.log(this.props);
        let causes = [];
        for (let i = 0; i < causeList.length; i++) {
            console.log(causeList[i].eventName);
            causes.push({ key: causeList[i].id, text: causeList[i].causeName, value: causeList[i].id })
        }
        return (
            <div>
                <Form.Group widths='equal'>
                    <Form.Select
                        options={amounts}
                        label='Minimum Donation'
                        placeholder='Minimum Donation'
                        name='minDonation'
                        value={this.state.minDonation}
                        onChange={this.handleChange}
                    />
                    <Form.Select
                        options={amounts}
                        label='Recommended Donation'
                        placeholder='Recommended Donation'
                        name='recommendedDonation'
                        value={this.state.recommendedDonation}
                        onChange={this.handleChange}
                    />


                </Form.Group>
                <Dropdown
                    placeholder='Choose a Cause'
                    fluid
                    search
                    selection
                    options={causes}
                />
            </div>
            // .map(function(item)  { return item.causeName})
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCauses)