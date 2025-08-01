import { useContext, type FC } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PSP, type ConsultPayPalSSD, type PSPType } from "@/types";
import { PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentContext } from "@/components/EnvironmentContext";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import LoadWrapper from "./LoadWrapper";
import PaypalElement from "./Element";

interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  external?: Record<string, any>;
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
  onError?: (error: PaymentError) => void;
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
      pspId: config.id,
      external: {
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

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
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
      <LoadWrapper onError={handleError}>
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
      </LoadWrapper>
    </PayPalScriptProvider>
  );
};

export default Paypal;
