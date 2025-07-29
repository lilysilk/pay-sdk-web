import { useContext, type FC } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PSP, type ConsultPayPalSSD, type PSPType } from "@/types";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentContext } from "@/components/EnvironmentContext";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import PaypalElement from "./Element";

interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  extranal?: Record<string, any>;
}

interface CompleteData {
  pspType: PSPType;
  paymentType: string;
}

interface PaypalProps {
  currency: string;
  config: ConsultPayPalSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: SubmitData) => Promise<any>;
  onComplete?: (payment: CompleteData) => Promise<any>;
  onError?: (error: Error) => void;
}

const Paypal: FC<PaypalProps> = ({
  currency,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const { env } = useContext(EnvironmentContext)!;
  const paypalEnv = env === "prod" ? "production" : "sandbox";

  const handleSubmit = useMemoizedFn(async () => {
    const result = await onSubmit?.({
      pspType: PSP.PAYPAL,
      paymentType: "wallet",
      pspId: config.merchantConfiguration.clientId,
      extranal: {
        browserInfo: {
          colorDepth: screen?.colorDepth,
          javaEnabled: navigator?.javaEnabled,
          screenHeight: window?.screen?.height,
          screenWidth: screen?.width,
          timeZoneOffset: new Date().getTimezoneOffset(),
          userAgent: navigator?.userAgent,
        },
      },
    });
    return result;
  });

  const handleComplete = useMemoizedFn(async () => {
    const result = await onComplete?.({
      pspType: PSP.PAYPAL,
      paymentType: "wallet",
    });
    return result;
  });

  const handleError = useMemoizedFn((error: Error) => {
    onError?.(error);
  });

  return (
    <PayPalScriptProvider
      options={{
        clientId: config.merchantConfiguration.clientId,
        environment: paypalEnv,
        components: "buttons",
        intent: "capture",
        vault: false,
        // 需要动态传入
        currency,
        commit: false,
      }}
    >
      <PaymentMethodCard
        id="paypal"
        title="Paypal"
        onSelect={onPaymentMethodSelected}
      >
        <PaypalElement
          onSubmit={handleSubmit}
          onComplete={handleComplete}
          onError={handleError}
        />
      </PaymentMethodCard>
    </PayPalScriptProvider>
  );
};

export default Paypal;
