import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        seeRooms: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request)
            const { toId } = args;
            const { user } = request;
            console.log(user.username);
            console.log(toId);

           return prisma
            .rooms({
              where: {
                 AND:[
                      {participants_some: {id:toId}},
                      {participants_some: {id:user.id}}
                ]
          }
        })
  
        }
    }
}