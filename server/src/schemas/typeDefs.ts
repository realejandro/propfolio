const typeDefs = `
    type Property {
        title: String
        description: String
        image: String
        content: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedProperties: [Property]
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
    }

`
export default typeDefs;
/*
addBook(bookId:String, title:String, authors:[String], description:String, image:String, link:String ): User
        removeBook(bookId:String): User

*/