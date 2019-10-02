import gql from 'graphql-tag';

export const OrganizationsQuery = gql`
  query OrganizationsQuery() {
    getOrganizations() {
      items {
        id
        orgname
      }
    }
  }
`;


export const CausesQuery = gql`
  query CausesQuery() {
    getAllCauses {
      causes {
        causeName
        country
        details
        image
       }
    }
  }
`;



export const CauseQuery = gql`
  query CauseQuery($id: String!, $organizationId: ) { 
    getCauseInfo(id: $id, organizationId: $organizationId) {
      causeName
    }
  }
`;



