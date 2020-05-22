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
$hostName: String!, 
$hostEmail: String!,
$recommendedDonation: Int,
$date: String!, 
$time: String!,
$endTime: String,
$eventDetails: String!,
$viewId: String!,
$editId: String!,
$rsvpId: String!,
$guests: AWSJSON

) {
   addEvent(
   eventName: $eventName,
   cause: $cause, 
   organizationId: $organizationId, 
   hostName: $hostName, 
   hostEmail: $hostEmail, 
   location: $location, 
   recommendedDonation: $recommendedDonation,
   date: $date,
   time: $time,
   endTime: $endTime,
   eventDetails: $eventDetails,
   viewId: $viewId,
   editId: $editId,
   rsvpId: $rsvpId,
   guests: $guests
   ) {
    eventName
    editId
  }
  }
`;


export const createVirtualEvent = `mutation createVirtualEvent(
  $eventName: String!, 
  $cause: String!, 
  $organizationId: String!, 
  $location: String, 
  $hostName: String!, 
  $hostEmail: String!,
  $recommendedDonation: Int,
  $date: String!, 
  $time: String!,
  $endTime: String,
  $eventDetails: String!,
  $viewId: String!,
  $editId: String!,
  $rsvpId: String!,
  $guests: AWSJSON
  
  ) {
    createVirtualEvent(
     eventName: $eventName,
     cause: $cause, 
     organizationId: $organizationId, 
     hostName: $hostName, 
     hostEmail: $hostEmail, 
     location: $location, 
     recommendedDonation: $recommendedDonation,
     date: $date,
     time: $time,
     endTime: $endTime,
     eventDetails: $eventDetails,
     viewId: $viewId,
     editId: $editId,
     rsvpId: $rsvpId,
     guests: $guests
     )
    }
  `;


export const getEventForView = `query getEventForView($viewId: String!) {
  getEventForView(viewId: $viewId) {
    id
    eventName
    hostName
    hostEmail
    causeDetails
    recommendedDonation
    location
    date
    time
    viewId
    editId
    rsvpId
    guests
  }
}
`

export const getEventForEdit = `query getEventForEdit($editId: String!) {
  getEventForEdit(editId: $editId) {
    id
    eventName
    eventDetails
    cause
    causeDetails
    hostName
    hostEmail
    recommendedDonation
    location
    date
    time
    viewId
    editId
    rsvpId
    guests
  }
}
`

export const addGuest = `mutation addGuest($guestId: String!, $eventId: String!, $guestDetails: AWSJSON!) {
  addGuest(guestId: $guestId, eventId: $eventId, guestDetails: $guestDetails) 
}
`;

export const removeGuest = `mutation removeGuest($guestId: String!, $eventId: String!) {
  removeGuest(guestId: $guestId, eventId: $eventId) 
}
`;


export const addCharge = `mutation addCharge($eventId: String!, $guestId: String!, $causeId: String!, $amount: Int, $willDonate: Boolean!, $guest: String!) {
    addCharge(eventId: $eventId, guestId: $guestId, causeId: $causeId, amount: $amount, guest: $guest, willDonate: $willDonate) {
      body
    }
  }
`;

export const sendInvitation = `mutation sendInvitation($data: String!) {
  sendInvitation(data: $data) 
}
`;

