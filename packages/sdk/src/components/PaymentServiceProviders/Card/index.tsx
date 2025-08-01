import type { FC } from "react";
import { size } from "lodash-es";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { PSP, type CounsultCardSSD, type PSPType } from "@/types";
import { PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import { type SuccessData } from "./utils/messageChannel";
import CardElement, { type BindSuccessData } from "./Element";

export interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  cardInfo: {
    lpsCardToken: string;
    lpsCardTokenVersion: string;
    isServer?: boolean;
    cardTokenId?: string;
  };
}

interface CompleteData {
  pspType: PSPType;
  paymentType: string;
}

interface CardProps {
  orderId: string;
  config: CounsultCardSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (data: SubmitData) => Promise<any>;
  onComplete?: (data: CompleteData) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const MAX_STORED_PAYMENT_METHODS = 5;

const Card: FC<CardProps> = ({
  orderId,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const storedPaymentMethods = config.paymentConfiguration.storedPaymentMethods;
  const allowSave = size(storedPaymentMethods) <= MAX_STORED_PAYMENT_METHODS;

  const handleSubmit = useMemoizedFn(
    async (
      data:
        | (SuccessData & { type: "card" })
        | (BindSuccessData & { type: "bind" })
    ) => {
      await onSubmit?.({
        pspType: PSP.CARD,
        paymentType: data.type,
        pspId: config.id,
        cardInfo: {
          lpsCardToken: data.lpsCardToken,
          lpsCardTokenVersion: data.version,
          ...(data.type === "card" && {
            isServer: true,
          }),
          ...(data.type === "bind" && {
            cardTokenId: data.cardToken,
          }),
        },
      });
      await onComplete?.({
        pspType: PSP.CARD,
        paymentType: "card",
      });
    }
  );

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
    onError?.(error);
  });

  return (
    <>
      {storedPaymentMethods.map((item) => {
        return (
          <PaymentMethodCard
            key={item.id}
            id={`card-${item.id}`}
            title={`${item.brand} ${item.bin}******${item.lastFour}`}
            onSelect={onPaymentMethodSelected}
          >
            <CardElement
              type="bind"
              orderId={orderId}
              cardToken={item.id}
              onSubmit={handleSubmit}
              onError={handleError}
            />
          </PaymentMethodCard>
        );
      })}
      <PaymentMethodCard
        id="card-card"
        title="Credit Card"
        onSelect={onPaymentMethodSelected}
      >
        <CardElement
          type="card"
          allowSave={allowSave}
          orderId={orderId}
          onSubmit={handleSubmit}
          onError={handleError}
        />
      </PaymentMethodCard>
    </>
  );
};

export default Card;
