import mongoose from "mongoose";
import { Schema } from "mongoose";
import { TOrder, TUser, TUserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const orderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
      message: "{VALUE} is not a unique",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      message: "{VALUE} is not a valid username",
    },
    password: { type: String, required: true },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      message: "{VALUE} is not a valid email",
    },
    isActive: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    hobbies: [{ type: String, required: true }],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    orders: [ orderSchema ],
  },
  // {
  //   toJSON: {
  //     virtuals: true
  //      }
  //   },
);

userSchema.set("versionKey", false);
orderSchema.set("versionKey", false);

// userSchema.pre("save", async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   // hashing password and save into DB
//   user?.password = await bcrypt.hash(
//     user?.password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   next();
// });

userSchema.pre("save", async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  const password: string | Buffer = user.password as string | Buffer;
  // Now you can use 'password' without TypeScript complaining

  user.password = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// userSchema.post("save", function (doc, next) {
//   const userWithoutPassword = doc.toObject();
//   delete userWithoutPassword.password;

//   console.log("doc from models", userWithoutPassword);

//   next();
// });
userSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

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

userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;  
};

const UserModel = mongoose.model<TUser, TUserModel>("User", userSchema);
const OrderModel = mongoose.model<TOrder>("Order", orderSchema);

export { UserModel, OrderModel };
