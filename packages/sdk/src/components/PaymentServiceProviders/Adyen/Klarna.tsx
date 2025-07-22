import { useRef, useEffect, type FC } from "react";
import { Klarna, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenKlarnaProps {
  type: string;
  adyenCheckout: Core;
}

const AdyenKlarna: FC<AdyenKlarnaProps> = ({ type, adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Klarna>();

  const initElement = useMemoizedFn(async () => {
    const element = new Klarna(adyenCheckout, {
      type,
      useKlarnaWidget: true,
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

export default AdyenKlarna;
