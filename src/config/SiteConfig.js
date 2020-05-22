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
  }
}

export default siteConfig;
