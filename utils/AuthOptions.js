import GoogleProvider from 'next-auth/providers/google'
import ConnectDB from '@/config/database'
import User from '@/config/models/User'

export const AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        //invoked on sign in successful
        async signIn({profile}){
            //1. Connect to databse
            await ConnectDB();
            //2. Check if user exists
            const userExists = await User.findOne({email: profile.email});
            //3. if not, create user
            if(!userExists){
                //truncate the username if its too long
                const username = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            //4. Return true to allow to sign  in
            return true;
        },
        //Session callback function that modifies the session object
        async session({session}){
            await ConnectDB()
            // 1. Get user from database
            const user = await User.findOne({email: session.user.email})
            // 2. Assign user id from the session
            session.user.id = user._id.toString()
            // 3. Return Session
            return session;
        }
    }

}