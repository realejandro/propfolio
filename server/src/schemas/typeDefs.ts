const typeDefs = `
    type Property {
        _id: ID!
        location: String
        squareFootage: Int
        bedrooms: Int
        bathrooms: Int
        price: Int
        status: String
        photos: [String]   # changed from photo: String
        description: String
        userId: ID!
    }

    type Room {
        _id: ID!
        propertyId: ID!
        title: String
        squareFootage: Int
        photos: [String]   # changed from photo: String
        description: String
        createdAt: String
        updatedAt: String
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
        getRoomsByProperty(propertyId: ID!): [Room]
    }

    input PropertyInput {
        location: String!
        squareFootage: Int!
        bedrooms: Int!
        bathrooms: Int!
        price: Int!
        status: String!
        photos: [String]   # changed from photo: String
        description: String
    }

    input RoomInput {
        propertyId: ID!
        title: String!
        squareFootage: Int!
        photos: [String]   # changed from photo: String
        description: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String, password: String): Auth

        addProperty(input: PropertyInput!): Property
        updateProperty(id: ID!, input: PropertyInput!): Property
        deleteProperty(id: ID!): Boolean

        addRoom(input: RoomInput!): Room
        updateRoom(id: ID!, input: RoomInput!): Room
        deleteRoom(id: ID!): Boolean
    }
`;

export default typeDefs;

