import { useRef, useEffect, type FC } from "react";
import { PayByBankUS, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenPayByBankUSProps {
  adyenCheckout: Core;
}

// paybybank_AIS_DD

const AdyenPayByBankUS: FC<AdyenPayByBankUSProps> = ({ adyenCheckout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<PayByBankUS>();

  const initElement = useMemoizedFn(async () => {
    const element = new PayByBankUS(adyenCheckout, { name: "PayByBank" });
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

export default AdyenPayByBankUS;
