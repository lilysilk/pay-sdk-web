import { useRef, useEffect, type FC } from "react";
import { OnlineBankingCZ, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenOnlineBankingCZProps {
  adyenCheckout: Core;
}

// onlineBanking_CZ
const AdyenOnlineBankingCZ: FC<AdyenOnlineBankingCZProps> = ({
  adyenCheckout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<OnlineBankingCZ>();

  const initElement = useMemoizedFn(async () => {
    const element = new OnlineBankingCZ(adyenCheckout, {
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

export default AdyenOnlineBankingCZ;
