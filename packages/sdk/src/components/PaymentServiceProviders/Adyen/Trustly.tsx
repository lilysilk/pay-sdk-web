import { useRef, useEffect, type FC } from "react";
import { Trustly, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenTrustlyProps {
  adyenCheckout: Core;
}

const AdyenTrustly: FC<AdyenTrustlyProps> = ({ adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Trustly>();

  const initElement = useMemoizedFn(async () => {
    const element = new Trustly(adyenCheckout);
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

export default AdyenTrustly;
