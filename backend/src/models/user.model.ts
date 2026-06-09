import mongoose, { Schema, Document } from "mongoose";
 
export interface IUser extends Document {

  fullName: string;
  username: string;

  bloodGroup: string;

  email: string;

  phoneNumber: string;

  address: string;

  password: string;

  role: "donor" | "organization";

}
 
const userSchema = new Schema<IUser>(

  {

    fullName: {

      type: String,

      required: true,

      trim: true,

    },
 
    bloodGroup: {

      type: String,

      required: true,

    },
 
    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,

    },
 
    phoneNumber: {

      type: String,

      required: true,

    },
 
    address: {

      type: String,

      required: true,

    },
 
    password: {

      type: String,

      required: true,

    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
 
    role: {

      type: String,

      enum: ["donor", "organization"],

      default: "donor",

    },

  },

  {

    timestamps: true,

  }

);
 
export default mongoose.model<IUser>("User", userSchema);
 


// import mongoose, { Schema, Document } from "mongoose";
// import { UserType } from "../types/user.type";

// export interface IUser extends UserType, Document {
//   _id: mongoose.Types.ObjectId;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const UserMongoSchema: Schema<IUser> = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },

//     lastName: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// export const UserModel = mongoose.model<IUser>("User", UserMongoSchema);