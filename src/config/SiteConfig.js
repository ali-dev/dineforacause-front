import trigger from '../graphql/triggers'
class siteConfig {
    constructor() {
        if (parseInt(process.env.REACT_APP_COVID19 ) === 1) {
            return  new Covid();
        } else {
            return new RegularSite();
        }
    }
} 

class Covid {
    constructor() {
        this.createEventLabel = 'Create Event';
        this.getCreateEventTrigger = trigger.createVirtualEvent;
    }
    
}

class RegularSite {
    constructor() {
        this.createEventLabel= 'Create Event';
        this.getCreateEventTrigger = trigger.createEvent;
    }
}

export default siteConfig;
