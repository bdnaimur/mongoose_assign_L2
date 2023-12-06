import { TOrder, TUser } from "./user.interface";
import { OrderModel, UserModel } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
    if (await UserModel.isUserExists(userData.userId)) {
      throw new Error('User already exists!');
    }
  const beforeResult = new UserModel(userData);
  // console.log('result from service', result);
    await beforeResult.save()
  return beforeResult.toObject();
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}, 'username fullName age email address').select('-_id');
  return result;
};

const getAllOrdersFromDB = async (userId: string | number) => {
  const result = await UserModel.findOne({ userId },'orders');
  return result;
};

const addOrdersToDB = async (odersData: TOrder) => {
  const result = await OrderModel.create(odersData);
  return result;
};

const getSingleUserFromDB = async (id: string | number) => {
  const result = UserModel.findOne({ userId: id });
  return result;
};

const deleteUserFromDB = async (id: string | number) => {
  const result = await UserModel.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

const updateUserFromDB = async (id: string | number, userData: Partial<TUser>) => {
  // console.log("id", id);
  
  const result = await UserModel.findOneAndUpdate({ userId: id }, userData,{ new: true },);
  // console.log("result from service", result);

  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  getAllOrdersFromDB,
  addOrdersToDB
};
