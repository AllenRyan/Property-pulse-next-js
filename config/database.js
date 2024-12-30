import mongoose from "mongoose";

let connected = false;

export const ConnectDB = async () => {
    mongoose.set('strictQuery', true);

    if(connected){
        console.log('Database is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (error) {
        console.log(error)
    }
   
}
export default ConnectDB;