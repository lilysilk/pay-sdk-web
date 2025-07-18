import { useRef, useEffect, type FC } from "react";
import { MolPayEBankingMY, type Core } from "@adyen/adyen-web";
import { useMemoizedFn } from "@/hooks";

interface AdyenMolPayEBankingMYProps {
  adyenCheckout: Core;
}

// molpay_ebanking_fpx_MY
const AdyenMolPayEBankingMY: FC<AdyenMolPayEBankingMYProps> = ({
  adyenCheckout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<MolPayEBankingMY>();

  const initElement = useMemoizedFn(async () => {
    const element = new MolPayEBankingMY(adyenCheckout, {
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

export default AdyenMolPayEBankingMY;
