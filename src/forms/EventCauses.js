import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Form } from 'semantic-ui-react'
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
        console.log(props)
        this.state = {
            cause: false,
            causeList: [],
            minDonation: '',
            recommendedDonation: '',
        };
    }

    componentDidMount() {
        this.props.onRequestCauses();
        // this.setState({'cause': this.props.causeList[0]})
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    selectCause = (event, { name, value }) => {
        this.setState({ cause: this.props.causeList[value] })
    }

    render() {
        const { causeList } = this.props;
        const { cause } = this.state;
        const imagePath = 'https://dfac-main.s3.amazonaws.com/app';

        let causes = [];
        for (let i = 0; i < causeList.length; i++) {
            causes.push({ key: `causeSelect-${i}`, text: causeList[i].causeName, value: i })
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
                <Form.Field>
                    <Dropdown
                        selectOnNavigation={true}
                        placeholder="Choose a Cause"
                        fluid
                        search
                        selection
                        options={causes}
                        onChange={this.selectCause}
                    />
                </Form.Field>
                {cause!=false ? (
                <div>
                     
                    <div className="fl w-50 w-100-m w-50-l pa2">
                        <img className="w-100 db outline black-10" src={`${imagePath}/${cause.image}`} />

                        <dl className="mt2 f6 lh-copy tc">
                            <dt className="clip">Title</dt>
                            <dd className="ml0 black truncate w-100">{cause.causeName}</dd>
                            <dt className="clip">{cause.causeName}</dt>
                            <dd className="ml0 gray truncate w-100">{cause.organizationName}</dd>


                        </dl>
                    </div>
                    <div className="fl w-50 w-50-m w-50-r pa2">
                        {cause.details}
                    </div>
                    
                    
                    
                </div>
                ): (
                    <div></div>
                  )
                }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCauses)