const typeDefs = `
    type Book {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        users: [User]
        me: User
    }

    type Mutation {
        createUser(username: String, email:String, password: String): Auth
        login(email: String, password:String): Auth
        addBook(bookId:String, title:String, authors:[String], description:String, image:String, link:String ): User
        removeBook(bookId:String): User

    }

`
export default typeDefs;