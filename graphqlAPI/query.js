import { gql } from '@apollo/client';

export const FETCH_USER_DETAILS = gql`
query user($mobileNumber: String!) {
    user(mobileNumber: $mobileNumber) {
      id
      mobileNumber
      status
      createdAt
      updatedAt
    }
}
`;

