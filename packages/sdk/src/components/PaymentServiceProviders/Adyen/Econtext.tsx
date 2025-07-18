import { useRef, useEffect, type FC } from "react";
import { Econtext, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenEcontextProps {
  type: string;
  adyenCheckout: Core;
}

const AdyenEcontext: FC<AdyenEcontextProps> = ({ type, adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Econtext>();

  const initElement = useMemoizedFn(async () => {
    const element = new Econtext(adyenCheckout, {
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

export default AdyenEcontext;
