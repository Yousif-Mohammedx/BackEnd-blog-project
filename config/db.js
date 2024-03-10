import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.evn.DB_URI)
        console.log('Database is connected...')
    }
    catch (error) {
        console.log(`ERROR: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;