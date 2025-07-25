import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { PSP, type CounsultPCICardSSD, type PSPType } from "@/types";
import { useMemoizedFn } from "@/hooks";
import { type SuccessData } from "./utils/messageChannel";
import CardElement from "./Element";

export interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  cardInfo: {
    lpsCardToken: string;
    lpsCardTokenVersion: string;
    // kmsVersionId: string;
    isServer: boolean;
  };
}

interface CardProps {
  orderId: string;
  config: CounsultPCICardSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (data: SubmitData) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const Card: FC<CardProps> = ({
  orderId,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const handleSubmit = useMemoizedFn((data: SuccessData) => {
    return onSubmit?.({
      pspType: PSP.CARD,
      paymentType: "card",
      pspId: config.id,
      cardInfo: {
        lpsCardToken: data.lpsCardToken,
        lpsCardTokenVersion: data.version,
        // kmsVersionId: "lhd",
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
        <CardElement orderId={orderId} onSubmit={handleSubmit} type="card" />
      </PaymentMethodCard>
    </>
  );
};

export default Card;
