import type { FC } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import PaypalElement from "./Element";
import type { ConsultPayPalSSD } from "@/types";

interface PaypalProps {
  config: ConsultPayPalSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const Paypal: FC<PaypalProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: config.merchantConfiguration.clientId,
        environment: config.merchantConfiguration.environment as
          | "production"
          | "sandbox",
        components: "buttons",
        intent: "capture",
        vault: false,
        // 需要动态传入
        currency: "USD",
        commit: false,
      }}
    >
      <PaymentMethodCard id="paypal" onSelect={onPaymentMethodSelected}>
        <PaypalElement
          onSubmit={onSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      </PaymentMethodCard>
    </PayPalScriptProvider>
  );
};

export default Paypal;
