import { useRef, useEffect, type FC } from "react";
import { OnlineBankingPL, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenOnlineBankingPLProps {
  adyenCheckout: Core;
}

// onlineBanking_PL
const AdyenOnlineBankingPL: FC<AdyenOnlineBankingPLProps> = ({
  adyenCheckout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<OnlineBankingPL>();

  const initElement = useMemoizedFn(async () => {
    const element = new OnlineBankingPL(adyenCheckout, {
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

export default AdyenOnlineBankingPL;
