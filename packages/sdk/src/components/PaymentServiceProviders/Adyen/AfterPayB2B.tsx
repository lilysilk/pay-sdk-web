import { useRef, useEffect, type FC } from "react";
import { AfterPayB2B, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenAfterPayB2BProps {
  adyenCheckout: Core;
}

const AdyenAfterPayB2B: FC<AdyenAfterPayB2BProps> = ({ adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<AfterPayB2B>();

  const initElement = useMemoizedFn(async () => {
    const element = new AfterPayB2B(adyenCheckout);
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

export default AdyenAfterPayB2B;
