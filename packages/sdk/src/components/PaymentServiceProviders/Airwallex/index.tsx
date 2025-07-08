import { useEffect, type FC } from "react";
import { init, createElement } from "@airwallex/components-sdk";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import AirWallexDropIn from "./DropIn";
import AirWallexApplePay from "./ApplePay";
import AirWallexGooglePay from "./GooglePay";

interface AirwallexProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

let initAirwallexPromise: ReturnType<typeof init> | null = null;

const Airwallex: FC<AirwallexProps> = ({
  onPaymentMethodSelected,
  onSubmit,
}) => {
  if (initAirwallexPromise === null) {
    initAirwallexPromise = init({
      env: "demo", // Can choose other production environments, 'staging | 'demo' | 'prod'
      locale: "en",
      enabledElements: ["payments"],
    });
  }

  return (
    <>
      {/* <PaymentMethodCard id="airwallex" onSelect={onPaymentMethodSelected}>
        <AirWallexDropIn
          initAirwallexPromise={initAirwallexPromise}
          intentConfig={{
            intent_id: "123",
            client_secret: "123",
            currency: "USD",
          }}
        />
      </PaymentMethodCard> */}
      <PaymentMethodCard
        id="airwallex-applePay"
        onSelect={onPaymentMethodSelected}
      >
        <AirWallexApplePay
          initAirwallexPromise={initAirwallexPromise}
          config={{
            intent_id: "123",
            client_secret: "123",
            currency: "USD",
          }}
        />
      </PaymentMethodCard>
      <PaymentMethodCard
        id="airwallex-googlePay"
        onSelect={onPaymentMethodSelected}
      >
        <AirWallexGooglePay
          initAirwallexPromise={initAirwallexPromise}
          config={{
            intent_id: "123",
            client_secret: "123",
            currency: "USD",
          }}
        />
      </PaymentMethodCard>
    </>
  );
};

export default Airwallex;
