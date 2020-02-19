/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAllCauses = `query GetAllCauses {
  getAllCauses {
    causes {
      causeName
      country
      details
      id
      image
      organizationId
      organizationName
    }
  }
}
`;
export const getCauseInfo = `query GetCauseInfo($id: String!, $organizationId: String!) {
  getCauseInfo(id: $id, organizationId: $organizationId) {
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
export const getEventForEdit = `query GetEventForEdit($editId: String!) {
  getEventForEdit(editId: $editId) {
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
export const getEventForView = `query GetEventForView($viewId: String!) {
  getEventForView(viewId: $viewId) {
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
export const getOrganizationInfo = `query GetOrganizationInfo($name: String!) {
  getOrganizationInfo(name: $name) {
    name
  }
}
`;
export const getCause = `query GetCause($id: ID!) {
  getCause(id: $id) {
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
export const listCauses = `query ListCauses(
  $filter: ModelCauseFilterInput
  $limit: Int
  $nextToken: String
) {
  listCauses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      causeName
      country
      details
      id
      image
      organizationId
      organizationName
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getOrganization = `query GetOrganization($id: ID!) {
  getOrganization(id: $id) {
    name
  }
}
`;
export const listOrganizations = `query ListOrganizations(
  $filter: ModelOrganizationFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      name
    }
    nextToken
  }
}
`;
