/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganizationInfo = `query GetOrganizationInfo($name: String!) {
  getOrganizationInfo(name: $name) {
    name
  }
}
`;
export const getCauseInfo = `query GetCauseInfo($id: String!, $organizationId: String!) {
  getCauseInfo(id: $id, organizationId: $organizationId) {
    id
    causeName
    organizationId
    organizationName
    details
    image
    country
  }
}
`;
export const getAllCauses = `query GetAllCauses {
  getAllCauses {
    causes {
      id
      causeName
      organizationId
      organizationName
      details
      image
      country
    }
  }
}
`;
export const getEventForView = `query GetEventForView($viewId: String!) {
  getEventForView(viewId: $viewId) {
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
export const getEventForEdit = `query GetEventForEdit($editId: String!) {
  getEventForEdit(editId: $editId) {
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
