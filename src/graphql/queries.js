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


export const addEvent = `mutation addEvent($eventName: String!) {
   addEvent(eventName: $eventName) {
    eventName
  }
  }
`;


export const addCharge = `mutation addCharge($token: AWSJSON!) {
    addCharge(token: $token) {
      body
    }
  }
`;




