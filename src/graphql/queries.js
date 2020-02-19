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

export const getAllCauses = `query causes {
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
$cause: String!, 
$organizationId: String!, 
$location: String! , 
$minDonation: Int!,
$hostName: String!, 
$hostEmail: String!,
$recommendedDonation: Int,
$date: String!, 
$time: String!,
$maxCapacity: Int
$viewId: String!,
$editId: String!,
$rsvpId: String!
) {
   addEvent(
   eventName: $eventName,
   cause: $cause, 
   organizationId: $organizationId, 
   hostName: $hostName, 
   hostEmail: $hostEmail, 
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
    editId
  }
  }
`;

export const getEventForView = `query getEventForView($viewId: String!) {
  getEventForView(viewId: $viewId) {
    eventName
    hostName
    hostEmail
    causeDetails
    minDonation
    recommendedDonation
    location
    date
    time
    viewId
    editId
    rsvpId
  }
}
`

export const getEventForEdit = `query getEventForEdit($editId: String!) {
  getEventForEdit(editId: $editId) {
    eventName
    cause
    causeDetails
    hostName
    hostEmail
    minDonation
    recommendedDonation
    location
    date
    time
    viewId
    editId
    rsvpId
  }
}
`


export const addCharge = `mutation addCharge($token: String!) {
    addCharge(token: $token) {
      body
    }
  }
`;

