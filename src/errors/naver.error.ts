export class NaverError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.type = type;

    this.name = '[Naver Error]';

    this.cause = cause;
  }
}
