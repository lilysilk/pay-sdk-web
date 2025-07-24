import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { PSP, type CounsultPCICardSSD, type PSPType } from "@/types";
import { useMemoizedFn } from "@/hooks";
import { type SuccessData } from "./utils/messageChannel";
import CreditCard from "./CreditCard";
import CreditBind from "./CreditBind";

export interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  cardInfo: {
    lpsCardToken: string;
    lpsCardTokenVersion: string;
    kmsVersionId: string;
    isServer: boolean;
  };
}

interface PCICardProps {
  config?: CounsultPCICardSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (data: SubmitData) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const PCICard: FC<PCICardProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const handleSubmit = useMemoizedFn((data: SuccessData) => {
    return onSubmit?.({
      ...data,
      pspType: PSP.PCICARD,
      paymentType: "card",
      cardInfo: {
        lpsCardToken: data.lpsCardToken,
        lpsCardTokenVersion: data.version,
        kmsVersionId: "lhd",
        isServer: true,
      },
    });
  });

  return (
    <>
      {/* <PaymentMethodCard
        id="pcicard-credit-bind"
        onSelect={onPaymentMethodSelected}
      >
        <CreditBind />
      </PaymentMethodCard> */}
      <PaymentMethodCard
        id="pcicard-credit-card"
        title="Credit Card"
        onSelect={onPaymentMethodSelected}
      >
        <CreditCard onSubmit={handleSubmit} />
      </PaymentMethodCard>
    </>
  );
};

export default PCICard;
