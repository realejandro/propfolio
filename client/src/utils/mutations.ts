import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
        savedProperties {
          _id
          location
          squareFootage
          bedrooms
          bathrooms
          price
          status
          photos           # ✅ updated from photo
          description
          userId
        }
      }
    }
  }
`;

export const ADD_PROPERTY = gql`
  mutation AddProperty($input: PropertyInput!) {
    addProperty(input: $input) {
      _id
      location
      squareFootage
      bedrooms
      bathrooms
      price
      status
      photos            # ✅ updated from photo
      description
      userId
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input) {
      _id
      location
      squareFootage
      bedrooms
      bathrooms
      price
      status
      photos            # ✅ updated from photo
      description
      userId
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`;

export const ADD_ROOM = gql`
  mutation AddRoom($input: RoomInput!) {
    addRoom(input: $input) {
      _id
      propertyId
      title
      squareFootage
      photos            # ✅ updated from photo
      description
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ROOM = gql`
  mutation UpdateRoom($id: ID!, $input: RoomInput!) {
    updateRoom(id: $id, input: $input) {
      _id
      propertyId
      title
      squareFootage
      photos            # ✅ updated from photo
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation DeleteRoom($id: ID!) {
    deleteRoom(id: $id)
  }
`;


