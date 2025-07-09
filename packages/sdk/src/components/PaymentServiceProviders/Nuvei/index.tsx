import { useRef, type FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { loadExternalScript } from "@/utils";

declare global {
  interface Window {
    SafeCharge: any;
  }
}

interface NuveiProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const Nuvei: FC<NuveiProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  const initNuveiPromiseRef = useRef(
    (async () => {
      await loadExternalScript(
        "nuvei-sdk",
        "https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js"
      );
      return window.SafeCharge({
        env: "test",
        merchantId: "",
        merchantSiteId: "",
      });
    })()
  );

  return (
    <>
      <PaymentMethodCard id="nuvei" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </>
  );
};

export default Nuvei;
