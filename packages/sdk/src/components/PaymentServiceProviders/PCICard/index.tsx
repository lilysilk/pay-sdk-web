import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { PSP, type CounsultPCICardSSD, type PSPType } from "@/types";
import { useMemoizedFn } from "@/hooks";
import { type SuccessData } from "./utils/messageChannel";
import CreditCard from "./CreditCard";
import CreditBind from "./CreditBind";

interface SubmitData extends SuccessData {
  isServer: boolean;
  pspType: PSPType;
  paymentType: string;
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
      isServer: true,
      pspType: PSP.PCICARD,
      paymentType: "card",
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
