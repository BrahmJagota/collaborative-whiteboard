import  {connect} from 'mongoose';

async function connectDB() {
    try {
        await connect('mongodb://localhost:27017/mydatabase')
        .then(() => console.log("connected successfully"))
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
export default connectDB;