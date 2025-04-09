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
        income            # NEW
        notes             # NEW
        status
        photos            
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
      income            # NEW
      notes             # NEW
      status
      photos
      description
      userId
    }
  }
`;

export const QUERY_ROOMS_BY_PROPERTY = gql`
  query GetRoomsByProperty($propertyId: ID!) {
    getRoomsByProperty(propertyId: $propertyId) {
      _id
      propertyId
      title
      squareFootage
      photos
      description
      createdAt
      updatedAt
    }
  }
`;



