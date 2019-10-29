import gql from 'graphql-tag';
import client from '../api/appSyncClient';
import {getCauseInfo, getCauses, addCharge, addEvent} from './queries';



const trigger = {
    createEvent(eventData) { 
    	return client.mutate({
		    mutation: gql(addEvent),
		    variables: eventData
	  })
    }
}


export default trigger

