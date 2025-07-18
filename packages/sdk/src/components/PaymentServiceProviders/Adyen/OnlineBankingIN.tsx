import { useRef, useEffect, type FC } from "react";
import { OnlineBankingIN, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenOnlineBankingINProps {
  adyenCheckout: Core;
}

// onlinebanking_IN
const AdyenOnlineBankingIN: FC<AdyenOnlineBankingINProps> = ({
  adyenCheckout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<OnlineBankingIN>();

  const initElement = useMemoizedFn(async () => {
    const element = new OnlineBankingIN(adyenCheckout, {
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

export default AdyenOnlineBankingIN;
