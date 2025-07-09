import type { Payment } from "@airwallex/components-sdk";

export interface Response<T> {
  code: number;
  data: T;
  msg: string | Record<string, string>;
  message: string;
  success: boolean;
  errMsg?: string;
  errCode?: string;
  i18nErrCode?: string;
}

export type Environment = "dev" | "beta" | "pre" | "prod";

export interface ConsultMerchantConfigurationSSD {
  autoCapture: string;
  clientId: string;
  enable3DS: string;
  environment: string;
  spsMerchantAlias: string;
  spsMerchantId: string;
  spsRemoveKeys: string;
}

export interface ConsultPaymentMethodSSD {
  type: string;
  name: string;
  brands?: string[];
}
export interface ConsultCheckoutSSD {
  id: number;
  authMeta: {
    id: string;
    payment_session_token: string;
    _links: {
      self: { href: string };
    };
  };
  merchantConfiguration: ConsultMerchantConfigurationSSD & {
    publicKey: string;
  };
  paymentConfiguration: {
    paymentMethods: ConsultPaymentMethodSSD[];
    storedPaymentMethods: unknown[];
  };
  type: "CHECKOUT";
}

export interface ConsultAirWallexAuthMetaSSD {
  amount: number;
  available_payment_method_types: string[];
  client_secret: string;
  currency: string;
  id: string;
  billing: Payment.Billing;
  customer: {
    client_secret: string;
    id: string;
    merchant_customer_id: string;
    request_id: string;
  };
}

export interface ConsultAirWallexSSD {
  id: number;
  authMeta: ConsultAirWallexAuthMetaSSD;
  merchantConfiguration: ConsultMerchantConfigurationSSD & {
    googleMerchantName: string;
  };
  paymentConfiguration: {
    paymentMethods: ConsultPaymentMethodSSD[];
    storedPaymentMethods: unknown[];
  };
  type: "AIRWALLEX";
}
