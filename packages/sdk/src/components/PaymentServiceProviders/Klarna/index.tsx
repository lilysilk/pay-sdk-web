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
    <>
      {config.paymentConfiguration.paymentMethods.map((item: any) => (
        <PaymentMethodCard
          key={item.type}
          id={item.name}
          onSelect={onPaymentMethodSelected}
        >
          <KlarnaElement
            category={item.metadata.identifier}
            initKlarnaPromise={initKlarnaPromiseRef.current}
            onSubmit={onSubmit}
            onComplete={onComplete}
            onError={onError}
          />
        </PaymentMethodCard>
      ))}
    </>
  );
};

export default Klarna;
