import { gql } from "@apollo/client";


export const QUERY_ME = gql`
 query me {
  me {
    _id
    email
    password
    savedBooks {
      link
      image
      description
      bookId
      authors
      title
    }
    username
  }
}
`;