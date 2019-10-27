import gql from 'graphql-tag';
import client from '../api/appSyncClient';
import {getCauseInfo, getCauses, addCharge, addEvent} from './queries';

// export const createEvent = (eventData) {
// 	 return client.mutate({
// 	    mutation: gql(addEvent),
// 	    variables: eventData
// 	  })
// }

const trigger = {
    createEvent(eventData) { 
    	return client.mutate({
		    mutation: gql(addEvent),
		    variables: eventData
	  })
    }
    
    // bar() { console.log('bar') },
    // baz() { funcs.foo(); funcs.bar() } // here is the fix
}


export default trigger

