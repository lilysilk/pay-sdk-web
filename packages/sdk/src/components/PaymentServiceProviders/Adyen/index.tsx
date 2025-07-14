import { useRef, type FC } from "react";
import { AdyenCheckout } from "@adyen/adyen-web";
import "@adyen/adyen-web/styles/adyen.css";
import type { ConsultAdyenSSD } from "@/types";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import AdyenDropIn from "./DropIn";

interface AdyenProps {
  config: ConsultAdyenSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const Adyen: FC<AdyenProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const initAdyenPromiseRef = useRef(
    AdyenCheckout({
      environment: config.merchantConfiguration.payEnvironment as
        | "test"
        | "live"
        | "live-us"
        | "live-au"
        | "live-apse"
        | "live-in",
      clientKey: config.merchantConfiguration.clientKey,
      locale: "en",
      countryCode: "US",
      paymentMethodsResponse: {},
    })
  );

  return (
    <div>
      <PaymentMethodCard id="adyen" onSelect={onPaymentMethodSelected}>
        <AdyenDropIn
          onSubmit={onSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      </PaymentMethodCard>
    </div>
  );
};

export default Adyen;
