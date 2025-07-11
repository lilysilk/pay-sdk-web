import { type FC, useRef } from "react";
import type { ConsultKlarnaSSD } from "@/types";
import { loadExternalScript } from "@/utils/loadExternalScript";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import KlarnaElement from "./Element";

declare global {
  interface Window {
    Klarna: any;
  }
}

interface KlarnaProps {
  config: ConsultKlarnaSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const Klarna: FC<KlarnaProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const initKlarnaPromiseRef = useRef(
    (async () => {
      // 考虑报错的情形
      const klarnaReadyPromise = new Promise<any>((resolve) => {
        window.klarnaAsyncCallback = () => {
          resolve(window.Klarna);
        };
      });

      await loadExternalScript(
        "klarna-sdk",
        "https://x.klarnacdn.net/kp/lib/v1/api.js"
      );
      await klarnaReadyPromise;
      window?.Klarna?.Payments?.init({
        client_token: config.authMeta.token,
      });
      return window?.Klarna;
    })()
  );

  return (
    <div>
      <PaymentMethodCard id="klarna" onSelect={onPaymentMethodSelected}>
        <KlarnaElement
          initKlarnaPromise={initKlarnaPromiseRef.current}
          onSubmit={onSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      </PaymentMethodCard>
    </div>
  );
};

export default Klarna;
