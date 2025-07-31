export enum PaymentErrorType {
  RENDER = "RENDER",
  INIT = "INIT",
  API = "API",
  BUSINESS = "BUSINESS",
  UNKNOWN = "UNKNOWN",
}

export class PaymentError extends Error {
  public readonly type: PaymentErrorType;
  public readonly timestamp: number;

  constructor(message: string, type: PaymentErrorType) {
    super(message);
    this.type = type;
    this.timestamp = Date.now();
    this.name = this.constructor?.name ?? "PaymentError";

    Object.setPrototypeOf(this, PaymentError.prototype);
  }

  static renderError(message: string) {
    return new PaymentError(message, PaymentErrorType.RENDER);
  }

  static initError(message: string) {
    return new PaymentError(message, PaymentErrorType.INIT);
  }

  static apiError(message: string) {
    return new PaymentError(message, PaymentErrorType.API);
  }

  static businessError(message: string) {
    return new PaymentError(message, PaymentErrorType.BUSINESS);
  }

  static unknownError(message: string) {
    return new PaymentError(message, PaymentErrorType.UNKNOWN);
  }
}
