import { useRef, useEffect, type FC } from "react";
import { Atome, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenAtomeProps {
  adyenCheckout: Core;
}

const AdyenAtome: FC<AdyenAtomeProps> = ({ adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Atome>();

  const initElement = useMemoizedFn(async () => {
    const element = new Atome(adyenCheckout);
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

export default AdyenAtome;
