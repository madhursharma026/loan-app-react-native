import { gql } from '@apollo/client';

export const FIRST_STEP_USER_LOGIN = gql`
 mutation firstStepUserLogin($firstStepUserLoginInput: FirstStepLoginInput!)  {
  firstStepUserLogin(firstStepUserLoginInput: $firstStepUserLoginInput) {
    id
  }
}
`;

export const USER_LOGIN_VERIFICATION = gql`
  mutation UserLoginVerification($loginVerificationInput: LoginVerificationInput!) {
    userLoginVerification(loginVerificationInput: $loginVerificationInput) {
      jwtToken
      refreshToken
    }
  }
`;

export const USER_APPLY_FOR_LOAN = gql`
mutation ApplyLoan($addLoansArgs: AddLoansArgs!) {
  applyLoan(addLoansArgs: $addLoansArgs) {
    id
    loanAmount
    FullName
    EmailAddress
    Address
    Occupation
    MaritalStatus
    PanCardNumber
    AadharCardNumber
    user {
      id
      mobileNumber
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
