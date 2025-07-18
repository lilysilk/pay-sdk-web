import { useRef, useEffect, type FC } from "react";
import { PayByBank, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenPayByBankProps {
  adyenCheckout: Core;
}

// paybybank
const AdyenPayByBank: FC<AdyenPayByBankProps> = ({ adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<PayByBank>();

  const initElement = useMemoizedFn(async () => {
    const element = new PayByBank(adyenCheckout, { name: "PayByBank" });
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

export default AdyenPayByBank;
