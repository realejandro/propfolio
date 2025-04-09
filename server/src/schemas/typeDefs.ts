const typeDefs = `
    type Property {
        _id: ID!
        location: String
        squareFootage: Int
        bedrooms: Int
        bathrooms: Int
        income: Int          # ✅ NEW: monthly rental income
        status: String       
        photos: [String]
        description: String
        notes: String        # ✅ NEW: user notes
        userId: ID!
    }

    type Room {
        _id: ID!
        propertyId: ID!
        title: String
        squareFootage: Int
        photos: [String]
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
        income: Int          # ✅ NEW: rental income if status is "rented"
        status: String!
        photos: [String]
        description: String
        notes: String        # ✅ NEW: user notes
    }

    input RoomInput {
        propertyId: ID!
        title: String!
        squareFootage: Int!
        photos: [String]
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


