import { type FC, useEffect, useState } from "react";
import { init, type InitResult } from "@airwallex/components-sdk";
import {
  type ConsultAirWallexSSD,
  type ConsultPaymentMethodSSD,
  type PSPType,
  PSP,
} from "@/types";
import { isApplePaySupported, PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import PaymentMethodCard from "@/components/PaymentMethodCard";
// import AirWallexDropIn from "./DropIn";
import AirWallexApplePay from "./ApplePay";
import AirWallexGooglePay from "./GooglePay";

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

interface AirwallexProps {
  countryCode: string;
  config: ConsultAirWallexSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: SubmitData) => Promise<any>;
  onComplete?: (payment: CompleteData) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

// 原来airwallex只能全局初始化一次 看下现在好了没
// let globalAirwallex: InitResult | null = null;

const Airwallex: FC<AirwallexProps> = ({
  countryCode,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [airwallex, setAirwallex] = useState<InitResult | null>(null);
  const airwallexEnv = config.merchantConfiguration.environment || "demo";

  const baseConfig = {
    intent_id: config.authMeta?.id,
    client_secret: config.authMeta?.client_secret,
    currency: config.authMeta?.currency,
    amount: config.authMeta?.amount,
    countryCode: countryCode,
  };

  useEffect(() => {
    const initAirwallex = async () => {
      try {
        // if (globalAirwallex) {
        //   setAirwallex(globalAirwallex);
        //   return;
        // }
        const client = await init({
          env: airwallexEnv, // Can choose other production environments, 'staging | 'demo' | 'prod'
          // 需要根据storeCode或者当前浏览器语言来确定
          locale: "en",
          enabledElements: ["payments"],
        });
        // globalAirwallex = client;
        setAirwallex(client);
      } catch (error) {
        handleError?.(PaymentError.initError((error as Error)?.message));
        setAirwallex(null);
      }
    };
    initAirwallex();
  }, [airwallexEnv]);

  const handleSubmit = useMemoizedFn(async (type: string) => {
    onSubmit?.({
      pspType: PSP.AIRWALLEX,
      paymentType: type,
      pspId: config.id,
      external: {
        authenticationData: {
          intentId: config.authMeta.id,
        },
      },
    });
  });
  const handleComplete = useMemoizedFn(async (type: string) => {
    onComplete?.({
      pspType: PSP.AIRWALLEX,
      paymentType: type,
    });
  });

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
    onError?.(error);
  });

  const renderMethod = (method: ConsultPaymentMethodSSD) => {
    if (method.type === "googlepay") {
      return (
        <AirWallexGooglePay
          config={{
            ...baseConfig,
            merchantName: config.merchantConfiguration?.googleMerchantName,
          }}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
          onError={handleError}
        />
      );
    } else if (method.type === "applepay" && isApplePaySupported) {
      return (
        <AirWallexApplePay
          config={{
            ...baseConfig,
            autoCapture: config.merchantConfiguration?.autoCapture === "true",
            billing: config.authMeta?.billing,
          }}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
          onError={handleError}
        />
      );
    }
  };

  return (
    airwallex &&
    config?.paymentConfiguration?.paymentMethods?.map((method) => {
      const component = renderMethod(method);
      return component ? (
        <PaymentMethodCard
          key={method.type}
          id={`airwallex-${method.type}`}
          title={method.name}
          onSelect={onPaymentMethodSelected}
        >
          {component}
        </PaymentMethodCard>
      ) : null;
    })
  );
};

export default Airwallex;
