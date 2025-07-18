import type { Payment } from "@airwallex/components-sdk";

export interface Response<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export type Environment = "dev" | "beta" | "pre" | "prod";

export type RenderStatus = "success" | "error";

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

export type ConsultAdyenPaymentMethodSSD = ConsultPaymentMethodSSD & {
  configuration: {
    merchantId: string;
    merchantName: string;
    gatewayMerchantId: string;
  };
};

export interface ConsultAdyenSSD {
  id: number;
  merchantConfiguration: {
    environment: string;
    payEnvironment: string;
    clientKey: string;
  };
  paymentConfiguration: {
    paymentMethods: ConsultAdyenPaymentMethodSSD[];
  };
  type: "ADYEN";
}

export interface ConsultNuveiSSD {
  id: number;
  merchantConfiguration: {
    merchantId: string;
    merchantSiteId: string;
    payEnvironment: string;
    sessionToken: string;
  };
  paymentConfiguration: {
    paymentMethods: ConsultPaymentMethodSSD[];
  };
  type: "NUVEI";
}

export interface ConsultPayPalSSD {
  id: number;
  merchantConfiguration: {
    environment: string;
    clientId: string;
  };
  paymentConfiguration: {
    paymentMethods: ConsultPaymentMethodSSD[];
  };
  type: "PAYPAL";
}

export interface ConsultKlarnaSSD {
  id: number;
  authMeta: {
    token: string;
  };
  paymentConfiguration: {
    paymentMethods: ConsultPaymentMethodSSD[];
  };
  type: "KLARNA";
}

export interface CounsultPCICardSSD {
  id: number;

  type: "PCICARD";
}

export interface ConsultPaymentParams {
  req_id: string;
  paymentOrderId: string;
  countryCode: string;
  website: string;
  paymentGroup: string;
  metadata: {
    returnUrl: string;
  };
}

export type ConsultPaymentItemSSD =
  | ConsultCheckoutSSD
  | ConsultAirWallexSSD
  | ConsultAdyenSSD
  | ConsultNuveiSSD
  | ConsultPayPalSSD
  | ConsultKlarnaSSD
  | CounsultPCICardSSD;

export interface ConsultPaymentSSD {
  paymentServiceProviders: ConsultPaymentItemSSD[];
}
