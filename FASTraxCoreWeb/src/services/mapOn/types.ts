export interface MapOnErrorResponse {
  code: number;
  msg: string;
}

export interface MapOnResponse<T> {
  error?: MapOnErrorResponse;
  data?: T;
}
