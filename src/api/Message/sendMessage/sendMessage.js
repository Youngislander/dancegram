import { prisma } from "../../../../generated/prisma-client";
import newMessage, {channel} from "../newMessage/newMessage";


export default {
    Mutation: {
        sendMessage: async(_, args, {request, isAuthenticated, pubsub}) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId="", message="hi error", toId } = args;
            console.log(user.id);
            console.log(toId);
            let room
            if(roomId === ""){
              if(user.id !== toId){
                room = await prisma
                .createRoom({
                    participants: {
                    connect: 
                    [{ id: toId }, { id: user.id }]
                 }
               });
              }
            } else {
                room = await prisma.room({ id: roomId });
            }
            if (!room) {
                throw Error("Room not found");
            }
            
            
            const createMessage = await prisma.createMessage({
                text: message,
                from: {
                    connect: {id: user.id}
                },
                to: {
                    connect: {
                        id: toId
                    }
                },
                room: {
                    connect:{
                        id: room.id
                    }
                }

            }); 
            
            pubsub.publish(channel, {
                newMessage: createMessage,
                roomId: room.id
            })

            return createMessage
        }
    }
}