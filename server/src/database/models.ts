import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  boardId: string
  checkPassword(password: string): Promise<boolean>;
}
export interface IRoom {
  userId: string
  roomId: string
}
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
    required: true
  }
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const roomSchema:Schema<IRoom> = new Schema({
userId: {
  type: String,
  require: true
},
roomId: {
  type: String,
  required: true
}
})

export const UserModel = mongoose.model<IUser>('User', userSchema);
export const RoomModel = mongoose.model<IRoom>('room', roomSchema);
export default UserModel;
