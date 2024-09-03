import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://vandittewari16:YsQNQ5mtlFuXEjay@cluster0.r6bkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
        console.log('Database connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectDB;