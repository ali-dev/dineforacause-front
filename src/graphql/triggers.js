import gql from 'graphql-tag';
import client from '../api/appSyncClient';
import { addEvent, addGuest, removeGuest} from './queries'; // @todo: maybe include getCauseInfo, getCauses, addCharge,

const trigger = {
    createEvent(eventData) { 
    	return client.mutate({
		    mutation: gql(addEvent),
		    variables: eventData
	  })
	},
	addGuest(data) {
		return client.mutate({
			mutation: gql(addGuest),
			variables: data
		})
	},
	removeGuest(data) {
		return client.mutate({
			mutation: gql(removeGuest),
			variables: data
		})
	},
	
}




export default trigger

