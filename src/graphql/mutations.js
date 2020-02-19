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
export const createCause = `mutation CreateCause($input: CreateCauseInput!) {
  createCause(input: $input) {
    causeName
    country
    details
    id
    image
    organizationId
    organizationName
  }
}
`;
export const updateCause = `mutation UpdateCause($input: UpdateCauseInput!) {
  updateCause(input: $input) {
    causeName
    country
    details
    id
    image
    organizationId
    organizationName
  }
}
`;
export const deleteCause = `mutation DeleteCause($input: DeleteCauseInput!) {
  deleteCause(input: $input) {
    causeName
    country
    details
    id
    image
    organizationId
    organizationName
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
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
export const createOrganization = `mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    name
  }
}
`;
export const updateOrganization = `mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    name
  }
}
`;
export const deleteOrganization = `mutation DeleteOrganization($input: DeleteOrganizationInput!) {
  deleteOrganization(input: $input) {
    name
  }
}
`;
