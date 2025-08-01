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
  public meta: Record<string, any>;

  constructor(
    message: string,
    type: PaymentErrorType,
    meta?: Record<string, any>
  ) {
    super(message);
    this.type = type;
    this.timestamp = Date.now();
    this.name = this.constructor?.name ?? "PaymentError";
    this.meta = meta ?? {};
    Object.setPrototypeOf(this, PaymentError.prototype);
  }

  static renderError(message: string, meta?: Record<string, any>) {
    return new PaymentError(message, PaymentErrorType.RENDER, meta);
  }

  static initError(message: string, meta?: Record<string, any>) {
    return new PaymentError(message, PaymentErrorType.INIT, meta);
  }

  static apiError(message: string, meta?: Record<string, any>) {
    return new PaymentError(message, PaymentErrorType.API, meta);
  }

  static businessError(message: string, meta?: Record<string, any>) {
    return new PaymentError(message, PaymentErrorType.BUSINESS, meta);
  }

  static unknownError(message: string, meta?: Record<string, any>) {
    return new PaymentError(message, PaymentErrorType.UNKNOWN, meta);
  }
}
