export interface UserLoginSession {
  id: number;
  loginStartTime: Date;
  loginEndTime: Date;
  origin: string;
  ipAddress: string;
  browser: string;
  userId: number;
  sessionId: string;
}
