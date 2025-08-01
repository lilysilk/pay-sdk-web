import { useRef, type FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import type { ConsultNuveiSSD } from "@/types";
import { loadExternalScript, PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";

declare global {
  interface Window {
    SafeCharge: any;
  }
}

interface NuveiProps {
  config: ConsultNuveiSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const Nuvei: FC<NuveiProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const initNuveiPromiseRef = useRef(
    (async () => {
      await loadExternalScript(
        "nuvei-sdk",
        "https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js"
      );
      return window.SafeCharge({
        env: config.merchantConfiguration.payEnvironment,
        merchantId: config.merchantConfiguration.merchantId,
        merchantSiteId: config.merchantConfiguration.merchantSiteId,
      });
    })()
  );

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
    onError?.(error);
  });

  return (
    <>
      <PaymentMethodCard id="nuvei" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </>
  );
};

export default Nuvei;
