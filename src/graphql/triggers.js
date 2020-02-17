import gql from 'graphql-tag';
import client from '../api/appSyncClient';
import { addEvent} from './queries'; // @todo: maybe include getCauseInfo, getCauses, addCharge,

const trigger = {
    createEvent(eventData) { 
    	return client.mutate({
		    mutation: gql(addEvent),
		    variables: eventData
	  })
    }
}



export default trigger

