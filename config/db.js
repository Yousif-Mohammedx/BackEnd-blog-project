import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(proccess.evn.DB_URI)
    }
    catch (error) {
    }
}

export default connectDB;