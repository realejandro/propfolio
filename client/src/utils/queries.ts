import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedProperties {
        _id
        location
        squareFootage
        bedrooms
        bathrooms
        price
        status
        photo
        description
        userId
      }
    }
  }
`;


export const QUERY_USER_PROPERTIES = gql`
  query GetUserProperties($userId: ID!) {
    getUserProperties(userId: $userId) {
      _id
      location
      squareFootage
      bedrooms
      bathrooms
      price
      status
      photo
      description
      userId
    }
  }
`;
