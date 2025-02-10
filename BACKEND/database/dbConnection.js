import mongoose from "mongoose";



const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI, {
    dbName: "PORTFOLIO",
    }).then
    (() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(`some error occured while connecting to database ${err}`);
    });
}

export default dbConnection;