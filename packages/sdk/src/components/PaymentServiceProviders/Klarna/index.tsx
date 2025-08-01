import { type FC, useRef, useState, useEffect } from "react";
import { PSP, type PSPType, type ConsultKlarnaSSD } from "@/types";
import { loadExternalScript, PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import KlarnaElement, { type SubmitData as ElementSubmitData } from "./Element";

declare global {
  interface Window {
    Klarna: any;
  }
}

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

interface KlarnaProps {
  config: ConsultKlarnaSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: SubmitData) => Promise<any>;
  onComplete?: (payment: CompleteData) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const Klarna: FC<KlarnaProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [klarna, setKlarna] = useState<any>(null);

  useEffect(() => {
    const initKlarna = async () => {
      try {
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
        setKlarna(window?.Klarna);
      } catch (error) {
        handleError?.(PaymentError.initError((error as Error)?.message));
        setKlarna(null);
      }
    };
    initKlarna();
  }, [config.authMeta.token]);

  const handleSubmit = useMemoizedFn(async (payment: ElementSubmitData) => {
    const result = await onSubmit?.({
      pspType: PSP.KLARNA,
      paymentType: payment.type,
      pspId: config.id,
      external: {
        authenticationData: { authorizationToken: payment.authorization_token },
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

  const handleComplete = useMemoizedFn(async (type: string) => {
    const result = await onComplete?.({
      pspType: PSP.KLARNA,
      paymentType: type,
    });
    return result;
  });

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
    onError?.(error);
  });

  return (
    klarna &&
    config.paymentConfiguration.paymentMethods.map((item: any) => (
      <PaymentMethodCard
        key={item.type}
        id={item.name}
        onSelect={onPaymentMethodSelected}
      >
        <KlarnaElement
          category={item.type}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
          onError={handleError}
        />
      </PaymentMethodCard>
    ))
  );
};

export default Klarna;
