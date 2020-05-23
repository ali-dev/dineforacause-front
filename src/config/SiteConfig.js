import React from 'react';
import { Form } from 'semantic-ui-react';
import trigger from "../graphql/triggers";
class siteConfig {
  constructor() {
    if (parseInt(process.env.REACT_APP_COVID19) === 1) {
      return new Covid();
    } else {
      return new RegularSite();
    }
  }
}

class Covid {
  constructor() {
    this.createEventLabel = "Create Event";
    this.getCreateEventTrigger = trigger.createVirtualEvent;
    this.getLocationField = (handler, value) => {
      return <div></div>;
    };

    

    this.getCausesOptions = (data) => {
        
        const result = data.data.getAllCauses.causes.filter((val) => { return val.causeName == 'Covid19 Relief Fund'});
        console.log(result); 
        return result;
    };

    this.getCausesField = (onChangeHandler) => {
        return(
            <Form.Field required>
            <label>Cause</label>  
            <Dropdown
              selectOnNavigation={true}
              
              fluid
              search
              selection
              options={causes}
              onChange={onChangeHandler}
            />
          </Form.Field>
        )

    }
  }
}

class RegularSite {
  constructor() {
    this.createEventLabel = "Create Event";
    this.getCreateEventTrigger = trigger.createEvent;
    this.getLocationField = (handler, value) => {
      return (
        <div>
          <div className="ui divider"></div>
          <Form.TextArea
            required
            label="Where"
            onChange={handler}
            name="location"
            value={value}
            placeholder="Add an address or location"
          />
        </div>
      );
    };

    this.getCausesOptions = (data) => {
        return data.data.getAllCauses.causes;
    }
    

  }
}

export default siteConfig;
