//import models
import User from "../models/User.js";
import { AuthenticationError, signToken } from "../services/auth.js";
import { BookDocument } from "../models/Book.js";


interface addBookArgs { 
    bookId:string, 
    title:string, 
    authors:string[], 
    description:string, 
    image:string, 
    link:string 
}

interface CreateUserArgs {
    username: string,
    email: string,
    password: string
}

interface UserContext {
    username: string|null,
    _id: string|null
    email :string|null,
    savedBooks: BookDocument[] 
    
}

interface BookId{
    bookId:string
}




const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.find({}).populate('savedBooks')   
            } catch (error) {
                console.error('Error fetching school data', error);
                throw new Error('Failed to fetch schools data');
            }
        },
        me: async (_parent:unknown, _args:unknown, context:any) => {
            try {
                const userLogged = await User.findOne({ _id: context.user._id })
                return userLogged;
            } catch (error) {
                console.log(error)
                throw new Error("He is error:")
            }

        }
    },
    Mutation : {

        createUser: async (_parent: unknown, { username, email, password } : CreateUserArgs) : Promise<{ token: string, user: CreateUserArgs }> => {
            
            const user = await User.create({ username, email, password })

            const token = signToken(user.username, user.email, user._id)

            return  { token, user }

        },

        login: async (_parent: unknown, { email, password }: {email:string; password:string}): Promise<{ token:string, user:CreateUserArgs }> => {
            const user = await User.findOne({ email });
            
            if(!user) {
                throw new Error("Not Authenticated")
            }
            
            const correctPw = await user.isCorrectPassword(password);
            
            if(!correctPw){
                throw new Error("Wrong password")
            }

            const token = signToken(user.username, user.email, user._id)
            return { token, user }
        },

        addBook: async (_parent:unknown, { bookId, title, authors, description, image, link } : addBookArgs, context: any ): Promise<UserContext | null> => {
            if(context.user) {
                return await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedBooks: { bookId, title, authors, description, image, link } } },
                  { new: true, runValidators: true }
                );
            }
             
            throw new AuthenticationError("User not logged in")
        },
        removeBook: async (_parent:unknown, { bookId } : BookId, context: any ): Promise<UserContext | null> => {
            if(context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
            }
            throw AuthenticationError
        }

        
    }
}

export default resolvers;