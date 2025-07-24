import { useRef, useEffect, type FC } from "react";
import { GooglePay, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface GooglePayConfiguration {
  gatewayMerchantId: string;
  merchantId: string;
}

interface AdyenGooglePayProps {
  configuration: GooglePayConfiguration;
  adyenCheckout: Core;
  onClick: (type: string) => void;
}

const AdyenGooglePay: FC<AdyenGooglePayProps> = ({
  configuration,
  adyenCheckout,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<GooglePay>();

  const handleClick = useMemoizedFn((type: string) => {
    onClick?.(type);
  });

  const initElement = useMemoizedFn(async () => {
    const element = new GooglePay(adyenCheckout, {
      configuration: {
        gatewayMerchantId: configuration.gatewayMerchantId,
        merchantId: configuration.merchantId,
      },
      onClick: (resolve, reject) => {
        resolve();
        handleClick?.("googlepay");
      },
      buttonSizeMode: "fill",
    });
    elementRef.current = element;
    element.mount(containerRef.current!);
  });

  useEffect(() => {
    initElement();

    return () => {
      elementRef.current?.unmount();
      elementRef.current = undefined;
    };
  }, [adyenCheckout]);

  return <div ref={containerRef} />;
};

export default AdyenGooglePay;
