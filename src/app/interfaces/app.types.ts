
export type ResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};


export const USER_ROLE  = {
  admin: "admin",
  user: "user",
} as const;

export type TUserRole = keyof typeof USER_ROLE;


