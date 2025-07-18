import { useRef, useEffect, type FC } from "react";
import { AfterPay, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenAfterPayProps {
  type: string;
  adyenCheckout: Core;
}

const AdyenAfterPay: FC<AdyenAfterPayProps> = ({ type, adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<AfterPay>();

  const initElement = useMemoizedFn(async () => {
    const element = new AfterPay(adyenCheckout, { type });
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

export default AdyenAfterPay;
