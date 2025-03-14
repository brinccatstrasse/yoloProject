import { gql } from "@apollo/client";

// GraphQL Query to obtains all the countries
export const GET_COUNTRIES = gql`
  query countries {
    countries {
      code
      name
    }
  }
`;

// GraphQl query for filtering. Parameter $code as a string, and using $code for the filter input
export const GET_COUNTRIES_BY_CODE = gql`
  query GetCountriesByCode($code: String!) {
    countries(filter: { code: { eq: $code } }) {
      code
      name
    }
  }
`;