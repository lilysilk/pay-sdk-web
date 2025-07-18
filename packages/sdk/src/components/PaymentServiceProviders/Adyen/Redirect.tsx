import { useRef, useEffect, type FC } from "react";
import { Redirect, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenRedirectProps {
  type: string;
  adyenCheckout: Core;
}

const AdyenRedirect: FC<AdyenRedirectProps> = ({ type, adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Redirect>();

  const initElement = useMemoizedFn(async () => {
    const element = new Redirect(adyenCheckout, {
      type,
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

export default AdyenRedirect;
