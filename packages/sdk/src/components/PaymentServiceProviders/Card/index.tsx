import type { FC } from "react";
import { size } from "lodash-es";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { PSP, type CounsultCardSSD, type PSPType } from "@/types";
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
  onError?: (error: Error) => void;
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

  const handleSubmit = useMemoizedFn(async (data: SuccessData) => {
    await onSubmit?.({
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
    await onComplete?.({
      pspType: PSP.CARD,
      paymentType: "card",
    });
  });

  const handleError = useMemoizedFn((error: Error) => {
    onError?.(error);
  });

  return (
    <>
      {/* <PaymentMethodCard
        id="card-credit-bind"
        onSelect={onPaymentMethodSelected}
      >
        <CreditBind />
      </PaymentMethodCard> */}
      {storedPaymentMethods.map((item) => {
        return (
          <PaymentMethodCard
            key={item.id}
            id={`card-${item.id}`}
            title={`${item.brand} **** **** **** ${item.lastFour}`}
            onSelect={onPaymentMethodSelected}
          >
            <CardElement
              type="bind"
              orderId={orderId}
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
