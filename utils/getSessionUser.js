import { getServerSession } from "next-auth/next";
import { AuthOptions } from "./AuthOptions";

export const getSessionUser = async () => {
  
        const session = await getServerSession(AuthOptions);
        if(!session || !session.user){
            return null
        }
        return {
            user: session.user,
            userId: session.user.id,
        }
   
}