import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userVAlidationWithZod from "./user.validation";
import { OrderModel, UserModel } from "./user.model";
// import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    // const { userData } = req.body;
    const zodParsedData = userVAlidationWithZod.parse(req.body);
    // console.log("userData", userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    // console.log("result if already exists", result);

    const obj = result?.toObject();
    if ("password" in obj) {
      delete obj.password;
    }
    res.status(201).json({
      success: true,
      message: "User is created succesfully",
      data: obj,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      test: "test message",
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    console.log("result from all users", result.length);

    if (result.length == 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users are retrieved succesfully",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getAllOrdersFromDB(userId);
    
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log("userId", userId);

    const result = await UserServices.getSingleUserFromDB(userId);

    const obj = result?.toObject();
    if ("password" in obj) {
      delete obj.password;
    }
    res.status(200).json({
      success: true,
      message: "User is retrieved succesfully",
      data: obj,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const zodParsedData = userVAlidationWithZod.parse(req.body);
    const result = await UserServices.updateUserFromDB(userId, zodParsedData);
    const obj = result?.toObject();
    if ("password" in obj) {
      delete obj.password;
    }
    res.status(200).json({
      success: true,
      message: "User is retrieved succesfully",
      data: obj,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // console.log("user Id from delete", userId);

    await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "User is deleted succesfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    // Check if the user has the 'orders' property, if not, create it
    if (!user.orders) {
      user.orders = [];
    }

    // Assuming req.body contains the order data
    const result = await UserServices.addOrdersToDB(req.body)
    user.orders.push(result);

    // Save the updated user to the database
    await user.save();

    // Send a response with the updated user data
    res.status(200).json({
      "success": true,
      "message": "Order created successfully!",
      "data": null
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getAllOrdersFromDB(userId);

    let totalPrice: number| undefined = 0
    if (result !== null || result !== undefined) {
       totalPrice = result?.orders.reduce((acc:number, product:any) => {
        return acc + (product.price * product.quantity);
    }, 0);
    }
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Total Price fetched successfully!",
        totalPrice: totalPrice,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateSingleUser,
  updateOrder,
  getAllOrders,
  getUserTotalPrice
};
