/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addCharge = `mutation AddCharge($token: String!) {
  addCharge(token: $token) {
    body
  }
}
`;
export const addEvent = `mutation AddEvent(
  $cause: String!
  $date: String!
  $editId: String!
  $eventName: String!
  $hostEmail: String!
  $hostName: String!
  $location: String!
  $maxCapacity: Int
  $minDonation: Int!
  $organizationId: String!
  $recommendedDonation: Int
  $rsvpId: String!
  $time: String!
  $viewId: String!
) {
  addEvent(
    cause: $cause
    date: $date
    editId: $editId
    eventName: $eventName
    hostEmail: $hostEmail
    hostName: $hostName
    location: $location
    maxCapacity: $maxCapacity
    minDonation: $minDonation
    organizationId: $organizationId
    recommendedDonation: $recommendedDonation
    rsvpId: $rsvpId
    time: $time
    viewId: $viewId
  ) {
    cause
    causeDetails
    date
    editId
    eventName
    hostEmail
    hostName
    id
    location
    maxCapacity
    minDonation
    organizationId
    recommendedDonation
    rsvpId
    time
    viewId
  }
}
`;
