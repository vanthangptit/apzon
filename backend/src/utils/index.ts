export const appError = (message: string, statusCode?: number) => {
  let error: any = new Error(message);
  error.statusCode = statusCode ? statusCode : 500;
  return error;
};
