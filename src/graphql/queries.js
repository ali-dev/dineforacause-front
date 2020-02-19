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
