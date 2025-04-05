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

// NEW QUERY: Get all rooms associated with a specific property
export const QUERY_ROOMS_BY_PROPERTY = gql`
  query GetRoomsByProperty($propertyId: ID!) {
    getRoomsByProperty(propertyId: $propertyId) {
      _id
      propertyId
      title
      squareFootage
      photo
      description
      createdAt
      updatedAt
    }
  }
`;
