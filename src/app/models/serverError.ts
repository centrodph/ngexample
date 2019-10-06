export interface ServerError {
  message: string;
  error: {
    message: string;
    error: any;
  };
  status: number;
}
