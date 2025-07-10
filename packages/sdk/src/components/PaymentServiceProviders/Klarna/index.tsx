import { type FC, useRef } from "react";
import { loadExternalScript } from "@/utils/loadExternalScript";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import KlarnaElement from "./Element";

declare global {
  interface Window {
    Klarna: any;
  }
}

interface KlarnaProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
  onCompleted?: (payment: any) => void;
  onError?: (error: Error) => void;
}

const Klarna: FC<KlarnaProps> = ({
  onPaymentMethodSelected,
  onSubmit,
  onCompleted,
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
        client_token: "123",
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
          onCompleted={onCompleted}
          onError={onError}
        />
      </PaymentMethodCard>
    </div>
  );
};

export default Klarna;
