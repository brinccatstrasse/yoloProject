import { gql } from "@apollo/client";

// Define GraphQL Query
export const GET_COUNTRIES = gql`
  query countries {
    countries {
      code
      name
    }
  }
`;

export const GET_COUNTRIES_BY_CODE = gql`
  query GetCountriesByCode($code: String!) {
    countries(filter: { code: { eq: $code } }) {
      code
      name
    }
  }
`;