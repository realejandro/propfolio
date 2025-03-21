const typeDefs = `
    type Property {
        _id: ID!
        squareFootage: Int
        bedrooms: Int
        bathrooms: Int
        price: String
        status: String
        photo: String
        description: String
        userId: ID!
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
        getUserProperties(userId: ID!): [Property]
    }

    input PropertyInput {
        squareFootage: Int!
        bedrooms: Int!
        bathrooms: Int!
        price: String!
        status: String!
        photo: String
        description: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addProperty(input: PropertyInput!): Property
        updateProperty(id: ID!, input: PropertyInput!): Property
        deleteProperty(id: ID!): Boolean
    }
`

export default typeDefs;

/*
addBook(bookId:String, title:String, authors:[String], description:String, image:String, link:String ): User
        removeBook(bookId:String): User

*/