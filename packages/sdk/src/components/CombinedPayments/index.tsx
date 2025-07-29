import type { FC } from "react";
import { lazy, useState, useCallback, useMemo, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import {
  combinedPaymentsRenderStatesAtom,
  combinedPaymentsRenderAllFailedAtom,
} from "@/atom";
import {
  type PSPType,
  type ConsultPaymentItemSSD,
  type RenderStatus,
  PSP,
} from "@/types";
import { getCurrentUrl } from "@/utils";
import { useMemoizedFn, useCurrentTime } from "@/hooks";
import { EnvironmentContext } from "@/components/EnvironmentContext";
import LazyLoadWrapper from "@/components/LazyLoadWrapper";

// 懒加载所有支付组件
const Card = lazy(() => import("@/components/PaymentServiceProviders/Card"));
const Adyen = lazy(() => import("@/components/PaymentServiceProviders/Adyen"));
const Airwallex = lazy(
  () => import("@/components/PaymentServiceProviders/Airwallex")
);
const Checkout = lazy(
  () => import("@/components/PaymentServiceProviders/Checkout")
);
const Klarna = lazy(
  () => import("@/components/PaymentServiceProviders/Klarna")
);
const Nuvei = lazy(() => import("@/components/PaymentServiceProviders/Nuvei"));
const Paypal = lazy(
  () => import("@/components/PaymentServiceProviders/Paypal")
);

export interface CompleteData {
  pspType: PSPType;
  paymentType: string;
}

interface ConfirmPaymentParams {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  lpsCardToken?: string;
  lpsCardTokenVersion?: string;
  external?: {
    [key: string]: any;
  };
  cardInfo?: {
    lpsCardToken: string;
    lpsCardTokenVersion: string;
    // kmsVersionId: string;
    isServer: boolean;
  };
}

interface CombinedPaymentsProps {
  orderId: string;
  countryCode: string;
  amount: number;
  currency: string;
  forterTokenCookie: string;
  paymentServiceProviders: ConsultPaymentItemSSD[];
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onComplete?: (payment: CompleteData) => Promise<any>;
  // 渲染错误或者初始化错误 本组件自己处理 其它错误抛到上级
  onError?: (error: Error) => void;
}

const CombinedPayments: FC<CombinedPaymentsProps> = ({
  orderId,
  amount,
  currency,
  countryCode,
  forterTokenCookie,
  paymentServiceProviders,
  onComplete,
  onPaymentMethodSelected,
  onError,
  onSubmit,
}) => {
  const { confirmPayment } = useContext(EnvironmentContext)!;
  // const getCurrentTime = useCurrentTime(orderId);
  const combinedPaymentsRenderAllFailed = useAtomValue(
    combinedPaymentsRenderAllFailedAtom
  );
  const setCombinedPaymentsRenderStates = useSetAtom(
    combinedPaymentsRenderStatesAtom
  );

  // 状态变化处理器
  const handleStatusChange = useCallback(
    (name: string, status: RenderStatus) => {
      setCombinedPaymentsRenderStates((prev) => ({ ...prev, [name]: status }));
    },
    []
  );

  const { mutateAsync: confirmPaymentMutateAsync } = useMutation({
    mutationFn: async (payment: ConfirmPaymentParams) => {
      const res = await confirmPayment({
        idempotencyId: uuidv4(),
        channel: "Web",
        pspType: payment.pspType,
        paymentType: payment.paymentType,
        pspId: payment.pspId,
        paymentOrderId: orderId,
        returnUrl: getCurrentUrl(),
        paymentMethod: {
          ...payment.cardInfo,
          // shopCustomer: {
          //   accountId: 11111,
          //   isLogin: true,
          //   email: "jdoe@example.com",
          //   shopId: 10001,
          // },
        },
        riskMetadata: {
          // checkoutTime: getCurrentTime(),
          checkoutTime: "need to be fixed",
          forterTokenCookie,
        },
        ...payment.external,
      });
      return res;
    },
    onSuccess(data) {},
    onError(error) {
      onError?.(error);
    },
  });

  const handleSubmit = useMemoizedFn(async (payment: ConfirmPaymentParams) => {
    onSubmit?.("123", "123");

    console.log("handleSubmit", payment);
    return confirmPaymentMutateAsync(payment);
  });

  // 如果所有组件都失败，显示总的回退UI
  if (combinedPaymentsRenderAllFailed) {
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid #ff6b6b",
          borderRadius: "8px",
          backgroundColor: "#ffeaea",
          textAlign: "center",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => {}}
        >
          Retry All
        </button>
      </div>
    );
  }

  const renderPaymentServiceProvider = (item: ConsultPaymentItemSSD) => {
    if (item.type === PSP.CARD) {
      return (
        <Card
          orderId={orderId}
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === PSP.ADYEN) {
      return (
        <Adyen
          countryCode={countryCode}
          amount={amount}
          currency={currency}
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === PSP.AIRWALLEX) {
      return (
        <Airwallex
          countryCode={countryCode}
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === PSP.CHECKOUT) {
      return (
        <Checkout
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === PSP.KLARNA) {
      return (
        <Klarna
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === PSP.NUVEI) {
      return (
        <Nuvei
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === PSP.PAYPAL) {
      return (
        <Paypal
          currency={currency}
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    return null;
  };

  return paymentServiceProviders.map((item) => {
    return (
      <LazyLoadWrapper
        key={item.type}
        name={item.type}
        onStatusChange={handleStatusChange}
      >
        {renderPaymentServiceProvider(item)}
      </LazyLoadWrapper>
    );
  });
};

export default CombinedPayments;
