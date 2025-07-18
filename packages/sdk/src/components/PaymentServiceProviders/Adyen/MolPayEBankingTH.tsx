import { useRef, useEffect, type FC } from "react";
import { MolPayEBankingTH, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenMolPayEBankingTHProps {
  adyenCheckout: Core;
}

// molpay_ebanking_TH
const AdyenMolPayEBankingTH: FC<AdyenMolPayEBankingTHProps> = ({
  adyenCheckout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<MolPayEBankingTH>();

  const initElement = useMemoizedFn(async () => {
    const element = new MolPayEBankingTH(adyenCheckout, {
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

export default AdyenMolPayEBankingTH;
