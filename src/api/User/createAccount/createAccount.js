import { prisma } from "../../../../generated/prisma-client";
import { argumentToArgumentConfig } from "graphql-tools";

export default {
    Mutation: {
        createAccount: async (_, args) =>{
            const {username="", email="", firstName="", lastName="", bio="", loginSecret="default"} = args;
            const exists = await prisma.$exists.user({
                 or: [
                     { username
                     }, 
                     { email }
                    ]   
                });
            if(exists) {
                throw Error("This username/ email is already taken");
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio,
                loginSecret,
                isFollowing:false,
                isSelf:true,
                followingCount: 0,
                followersCount:0,
                postsCount:0
            }) 
        return true;
        }
    }
}