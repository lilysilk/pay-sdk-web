import { type FC } from "react";
import { init } from "@airwallex/components-sdk";
import { ConsultAirWallexSSD } from "@/types";
import PaymentMethodCard from "@/components/PaymentMethodCard";
// import AirWallexDropIn from "./DropIn";
import AirWallexApplePay from "./ApplePay";
import AirWallexGooglePay from "./GooglePay";

interface AirwallexProps {
  countryCode: string;
  config: ConsultAirWallexSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

let initAirwallexPromise: ReturnType<typeof init> | null = null;

const Airwallex: FC<AirwallexProps> = ({
  countryCode,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  if (initAirwallexPromise === null) {
    initAirwallexPromise = init({
      env: "demo", // Can choose other production environments, 'staging | 'demo' | 'prod'
      locale: "en",
      enabledElements: ["payments"],
    });
  }

  const baseConfig = {
    intent_id: config.authMeta?.id,
    client_secret: config.authMeta?.client_secret,
    currency: config.authMeta?.currency,
    amount: config.authMeta?.amount,
    countryCode: countryCode,
  };

  return (
    <>
      <PaymentMethodCard
        id="airwallex-applePay"
        onSelect={onPaymentMethodSelected}
      >
        <AirWallexApplePay
          initAirwallexPromise={initAirwallexPromise}
          config={{
            ...baseConfig,
            autoCapture: config.merchantConfiguration?.autoCapture === "true",
            billing: config.authMeta?.billing,
          }}
          onSubmit={onSubmit}
          onComplet={onComplete}
          onError={onError}
        />
      </PaymentMethodCard>
      <PaymentMethodCard
        id="airwallex-googlePay"
        onSelect={onPaymentMethodSelected}
      >
        <AirWallexGooglePay
          initAirwallexPromise={initAirwallexPromise}
          config={{
            ...baseConfig,
            merchantName: config.merchantConfiguration?.googleMerchantName,
          }}
          onSubmit={onSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      </PaymentMethodCard>
    </>
  );
};

export default Airwallex;
