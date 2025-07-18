import { useRef, useEffect, type FC } from "react";
import { Dotpay, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenDotpayProps {
  adyenCheckout: Core;
}

const AdyenDotpay: FC<AdyenDotpayProps> = ({ adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Dotpay>();

  const initElement = useMemoizedFn(async () => {
    const element = new Dotpay(adyenCheckout, { name: "OnlineBanking" });
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

export default AdyenDotpay;
