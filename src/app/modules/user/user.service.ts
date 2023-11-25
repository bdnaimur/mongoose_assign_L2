import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
    if (await UserModel.isUserExists(userData.userId)) {
      throw new Error('User already exists!');
    }
  const result = await UserModel.create(userData);
  console.log('result from service', result);
  
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}, 'username fullName age email address');
  return result;
};

const getAllOrdersFromDB = async (userId: string | number) => {
  const result = await UserModel.findOne({ userId },'orders');
  return result;
};

// const getSingleUserFromDB = async (id: string | number) => {
//   const result = await UserModel.aggregate([{ $match: { id } }]);
//   return result;
// };

const getSingleUserFromDB = async (id: string | number) => {
  const result = UserModel.findOne({ userId: id });
  return result;
};

const deleteUserFromDB = async (id: string | number) => {
  const result = await UserModel.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

const updateUserFromDB = async (id: string | number, userData: TUser) => {
  const result = await UserModel.findOneAndUpdate({ userId: id }, userData,{ new: true },);
  console.log("result from service", result);

  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  getAllOrdersFromDB
};
