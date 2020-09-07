import { prisma } from "../../../../generated/prisma-client";
import { withFilter } from 'graphql-subscriptions' 
import {PubSub} from "graphql-yoga";

const pubsub = new PubSub();

export const channel = "new_Message"
export default {
    Subscription: {
      newMessage: {
        subscribe: withFilter( 
          () => pubsub.asyncIterator(channel),
          (payload, {roomId}) => {
           return payload.roomId === roomId
          }
        ),
        resolve: (payload,{roomId}) => {
               console.log(payload)
               return payload.newMessage
           }
        }
      }
  }
  
