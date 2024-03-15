export default interface CustomError extends Error {
  // name: string;
  message: string;
  // stack?: string; - Error 인터페이스 프로퍼티들을 직접 쓰거나 아니면 상속해준다.
  response?: {
    data: any;
    status: number;
    headers: string;
    info?: string;
  };
}
