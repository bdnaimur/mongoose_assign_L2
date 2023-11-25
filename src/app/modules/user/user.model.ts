import mongoose from "mongoose";
import { Schema } from "mongoose";
import { TOrder, TUser, TUserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>(
  {
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    hobbies: [{ type: String }],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    orders: [orderSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// userSchema.post("save", function (doc, next) {
//   const obj = doc?.toObject();
//   delete obj.password;
//   // console.log("doc", doc);

//   next();
// });

// userSchema.post("findOne", function (doc, next) {
//   // console.log("doc from findone", doc);

//   doc?.toObject();
//   delete doc.password;
//   // console.log("doc", doc);

//   next();
// });

// userSchema.post('save', function (doc, next) {
//   // console.log(this, 'pre hook : we will save  data');
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   // hashing password and save into DB
//   if ('password' in user) {
//     user.password='';
//   }
//   next();
// });

// creating a custom static method
userSchema.statics.isUserExists = async function (id: string | number) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});


const UserModel = mongoose.model<TUser, TUserModel>("User", userSchema);
const OrderModel = mongoose.model<TOrder>("Order", orderSchema);

export { UserModel, OrderModel };
