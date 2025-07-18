import { useRef, useEffect, type FC } from "react";
import { OnlineBankingSK, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenOnlineBankingSKProps {
  adyenCheckout: Core;
}

// onlineBanking_SK
const AdyenOnlineBankingSK: FC<AdyenOnlineBankingSKProps> = ({
  adyenCheckout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<OnlineBankingSK>();

  const initElement = useMemoizedFn(async () => {
    const element = new OnlineBankingSK(adyenCheckout, {
      name: "OnlineBanking",
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

export default AdyenOnlineBankingSK;
