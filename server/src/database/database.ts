import  {connect} from 'mongoose';

async function connectDB() {
    const dbUrl = process.env.DATABASE_URL as string;
    try {
        await connect(dbUrl)
        .then(() => console.log("connected successfully"))
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
export default connectDB;