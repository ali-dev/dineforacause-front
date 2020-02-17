/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addEvent = `mutation AddEvent(
  $eventName: String!
  $cause: String!
  $organizationId: String!
  $hostName: String!
  $hostEmail: String!
  $location: String!
  $minDonation: Int!
  $recommendedDonation: Int
  $maxCapacity: Int
  $date: String!
  $time: String!
  $viewId: String!
  $editId: String!
  $rsvpId: String!
) {
  addEvent(
    eventName: $eventName
    cause: $cause
    organizationId: $organizationId
    hostName: $hostName
    hostEmail: $hostEmail
    location: $location
    minDonation: $minDonation
    recommendedDonation: $recommendedDonation
    maxCapacity: $maxCapacity
    date: $date
    time: $time
    viewId: $viewId
    editId: $editId
    rsvpId: $rsvpId
  ) {
    id
    eventName
    cause
    organizationId
    causeDetails
    hostName
    hostEmail
    location
    date
    time
    minDonation
    recommendedDonation
    maxCapacity
    viewId
    rsvpId
    editId
  }
}
`;
export const addCharge = `mutation AddCharge($token: String!) {
  addCharge(token: $token) {
    body
  }
}
`;
