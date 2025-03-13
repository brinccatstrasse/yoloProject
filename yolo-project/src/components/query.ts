import { gql } from "@apollo/client";

// Define GraphQL Query
export const GET_COUNTRIES = gql`
  query countries {
    countries {
      code
      name
      emoji
    }
  }
`;