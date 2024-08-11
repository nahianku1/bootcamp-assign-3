import { TUserRole } from "../../interfaces/app.types";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role?: TUserRole;
  password: string;
  phone: string;
  address: string;
  status?: "in-progress" | "blocked";
  isDeleted?: boolean;
};
