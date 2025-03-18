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
  mutation createUser($username: String, $email: String, $password: String) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($bookId: String, $title: String, $authors: [String], $description: String, $image: String, $link: String) {
    addBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
      _id
      email
      password
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
      username
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String) {
    removeBook(bookId: $bookId) {
      _id
      email
      password
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;