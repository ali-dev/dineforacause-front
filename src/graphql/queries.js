/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganizationInfo = `query GetOrganizationInfo($name: String!) {
  getOrganizationInfo(name: $name) {
    id
    name
  }
}
`;
export const getCauseInfo = `query GetCauseInfo($organizationId: String!, $id: String!) {
  getCauseInfo(id: $id, organizationId: $organizationId) {
    causeName
    details
    image
    country
  }
}
`;

export const getCauses = `query causes {
   getAllCauses {
      causes {
        id
        organizationId
        organizationName
        causeName
        country
        details
        image
       }
    }
  }
`;


export const addEvent = `mutation addEvent(
$eventName: String!, 
$location: String! , 
$minDonation: Int, 
$recommendedDonation: Int!,
$date: String!, 
$time: String!,
$maxCapacity: Int!
$viewId: String!,
$editId: String!,
$rsvpId: String!
) {
   addEvent(
   eventName: $eventName, 
   location: $location, 
   minDonation: $minDonation, 
   recommendedDonation: $recommendedDonation,
   maxCapacity: $maxCapacity,
   date: $date,
   time: $time,
   viewId: $viewId,
   editId: $editId,
   rsvpId: $rsvpId
   ) {
    eventName
    viewId
  }
  }
`;

export const getEventByView = `query getEventByView($viewId: String!)
  getEventByView(viewId: $viewId) {
    eventName
    location
    date
    time
    viewId
    editId
    rsvpId
  }
`


export const addCharge = `mutation addCharge($token: AWSJSON!) {
    addCharge(token: $token) {
      body
    }
  }
`;




