import User from "../models/User.js";
import Property from "../models/Property.js";
import { signToken } from "../services/auth.js";
import { AuthenticationError } from "../services/auth.js";

// Define argument types for user and property mutations
interface CreateUserArgs {
    username: string,
    email: string,
    password: string
}

interface PropertyInput {
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    price: number;
    status: string;
    photo?: string;
    description?: string;
}

const resolvers = {
    Query: {
        // Fetches all users and populates their saved properties
        users: async () => {
            try {
                return await User.find({}).populate('savedProperties');
            } catch (error) {
                console.error('Error fetching users data', error);
                throw new Error('Failed to fetch users data');
            }
        },
        // Retrieves the currently authenticated user's data, including saved properties
        me: async (_parent: unknown, _args: unknown, context: any) => {
            if (!context.user) {
                throw new AuthenticationError("User not logged in");
            }
            try {
                return await User.findOne({ _id: context.user._id }).populate('savedProperties');
            } catch (error) {
                console.log(error);
                throw new Error("Error fetching user data");
            }
        },
        // Fetches all properties associated with a specific user
        getUserProperties: async (_parent: unknown, { userId }: { userId: string }) => {
            try {
                return await Property.find({ userId });
            } catch (error) {
                console.error('Error fetching properties', error);
                throw new Error('Failed to fetch properties');
            }
        }
    },
    Mutation: {
        // Creates a new user account and returns an authentication token
        createUser: async (_parent: unknown, { username, email, password }: CreateUserArgs): Promise<{ token: string, user: CreateUserArgs }> => {
            const user = await User.create({ username, email, password });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        // Authenticates a user by verifying their credentials and returning a token
        login: async (_parent: unknown, { email, password }: { email: string; password: string }): Promise<{ token: string, user: CreateUserArgs }> => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Not Authenticated");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Wrong password");
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        // Adds a new property to the database and associates it with the logged-in user
        addProperty: async (_parent: unknown, { input }: { input: PropertyInput }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError("User not logged in");
            }
            try {
                const newProperty = await Property.create({ ...input, userId: context.user._id });
                await User.findByIdAndUpdate(context.user._id, { $push: { savedProperties: newProperty._id } });
                return newProperty;
            } catch (error) {
                console.error("Error adding property", error);
                throw new Error("Failed to add property");
            }
        },
        // Updates an existing property if the authenticated user is the owner
        updateProperty: async (_parent: unknown, { id, input }: { id: string, input: PropertyInput }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError("User not logged in");
            }
            try {
                const updatedProperty = await Property.findOneAndUpdate(
                    { _id: id, userId: context.user._id },
                    { $set: input },
                    { new: true, runValidators: true }
                );
                if (!updatedProperty) {
                    throw new Error("Property not found or unauthorized");
                }
                return updatedProperty;
            } catch (error) {
                console.error("Error updating property", error);
                throw new Error("Failed to update property");
            }
        },
        // Deletes a property if the authenticated user is the owner and removes it from the user's saved properties
        deleteProperty: async (_parent: unknown, { id }: { id: string }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError("User not logged in");
            }
            try {
                const deletedProperty = await Property.findOneAndDelete({ _id: id, userId: context.user._id });
                if (!deletedProperty) {
                    throw new Error("Property not found or unauthorized");
                }
                await User.findByIdAndUpdate(context.user._id, { $pull: { savedProperties: id } });
                return true;
            } catch (error) {
                console.error("Error deleting property", error);
                throw new Error("Failed to delete property");
            }
        }
    }
};

export default resolvers;