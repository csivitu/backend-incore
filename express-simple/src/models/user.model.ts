import mongoose, { type Document, type Schema } from 'mongoose'

export interface UserType extends Document {
  _id: Schema.Types.ObjectId
  email: string
  passwordHash: string
  name: string
  createdAt: Date
}

const userSchema = new mongoose.Schema<UserType>({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model<UserType>('User', userSchema)

export default User
