import { Model } from "mongoose";

export interface TUser {
    userId: number;
    username: string;
    password?: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    age: number;
    email: string;
    isActive: 'active'|'inactive';
    hobbies: string[];
    address: {
      street: string;
      city: string;
      country: string;
    };
    orders: TOrder[];
    isDeleted: boolean;
  }
  
  export interface TOrder {
    productName: string;
    price: number;
    quantity: number;
  }
  

  export interface TUserModel extends Model<TUser> {
    isUserExists(id: string|number): Promise<TUser | null>;
  }

  // export interface StudentModel extends Model<TStudent> {
  //   isUserExists(id: string): Promise<TStudent | null>;
  // }