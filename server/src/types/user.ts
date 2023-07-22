import { ObjectId } from "mongoose";

export interface User {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAccountActivated?: boolean;
  isToResetPassword?: boolean;
}
