import type { Payment, Env } from "@airwallex/components-sdk";
import type { EnvironmentUnion } from "@checkout.com/checkout-web-components";

export interface Response<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export type StoreCode =
  | "us"
  | "de"
  | "nl"
  | "uk"
  | "ca"
  | "au"
  | "sg"
  | "fr"
  | "es"
  | "it"
  | "se"
  | "dk"
  | "jp"
  | "kr"
  | "ch";

export type Environment = "dev" | "beta" | "pre" | "prod";

export type AdyenEnvironment =
  | "test"
  | "live"
  | "live-us"
  | "live-au"
  | "live-apse"
  | "live-in";

export type RenderStatus = "success" | "error";

export const PSP = {
  ADYEN: "ADYEN",
  AIRWALLEX: "AIRWALLEX",
  CHECKOUT: "CHECKOUT",
  KLARNA: "KLARNA",
  NUVEI: "NUVEI",
  PAYPAL: "PAYPAL",
  CARD: "CARD",
} as const;

export type PSPType = (typeof PSP)[keyof typeof PSP];

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
    environment: EnvironmentUnion;
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
    environment: Env;
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
    payEnvironment: AdyenEnvironment;
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

export interface ConsultCardStoredPaymentMethodSSD {
  id: string;
  type: string;
  brand:
    | "Visa"
    | "Mastercard"
    | "American Express"
    | "Discover"
    | "Diners Club International"
    | "UATP"
    | "Maestro"
    | "JCB";
  bin: string;
  lastFour: string;
}

export interface CounsultCardSSD {
  id: number;
  paymentConfiguration: {
    paymentMethods: ConsultPaymentMethodSSD[];
    storedPaymentMethods: ConsultCardStoredPaymentMethodSSD[];
  };
  type: "CARD";
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
  | CounsultCardSSD;

export interface ConsultPaymentSSD {
  paymentServiceProviders: ConsultPaymentItemSSD[];
}

export interface ConfirmPaymentParams {
  idempotencyId: string;
  channel: string;
  paymentOrderId: string;
  pspType: PSPType;
  paymentType: string;
  pspId: number | string;
  returnUrl?: string;
  paymentMethod?: {
    lpsCardToken?: string;
    lpsCardTokenVersion?: string;
    isServer?: boolean;
    cardTokenId?: string;
  };
  riskMetadata: {
    checkoutTime: string;
    forterTokenCookie: string;
  };
  [key: string]: any;
}

export interface ConfirmPaymentSSD {
  errorCode: string;
  errorMessage: string;
  authMeta: {
    adyenResponse?: string;
    resultCode?: string;
    [key: string]: any;
  };
  status: string;
  paymentIntent: {
    cents: number;
    currency: string;
    idempotencyId: string;
    paymentIntentId: string;
    paymentServiceProviderId: string;
    paymentServiceProviderType: string;
    paymentType: string;
    pspEvent: string;
    pspStatus: string;
  };
}
