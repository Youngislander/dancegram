import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        myRooms: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request)
            const { user } = request;
           return prisma
            .rooms({
              where: {
                 AND:[
                      {participants_some: {id:user.id}}
                ]
          }
        })
  
        }
    }
}