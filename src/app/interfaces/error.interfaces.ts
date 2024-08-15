export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TErrorSourceReturnType = {
  statusCode: number;
  message: string;
  errorMessages: TErrorSource;
};
