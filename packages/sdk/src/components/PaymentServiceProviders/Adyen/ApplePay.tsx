import { useRef, useEffect, type FC } from "react";
import { ApplePay, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface ApplePayConfiguration {
  merchantId: string;
  merchantName: string;
}

interface AdyenApplePayProps {
  configuration: ApplePayConfiguration;
  adyenCheckout: Core;
  onClick: (type: string) => void;
}

const AdyenApplePay: FC<AdyenApplePayProps> = ({
  configuration,
  adyenCheckout,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<ApplePay>();

  const handleClick = useMemoizedFn((type: string) => {
    onClick?.(type);
  });

  const initElement = useMemoizedFn(async () => {
    const element = new ApplePay(adyenCheckout, {
      configuration: {
        merchantId: configuration.merchantId,
        merchantName: configuration.merchantName,
      },
      onClick: (resolve, reject) => {
        resolve();
        handleClick?.("applepay");
      },
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

export default AdyenApplePay;
