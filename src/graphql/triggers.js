import gql from 'graphql-tag';
import client from '../api/appSyncClient';
import { addEvent, addGuest, removeGuest, sendInvitation} from './queries'; // @todo: maybe include getCauseInfo, getCauses, addCharge,

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

	sendInvitation(data) {
		console.log(data);
		return client.mutate({
			mutation: gql(sendInvitation),
			variables: {
				data: JSON.stringify(data)
			}
		})
	},
	
}




export default trigger

