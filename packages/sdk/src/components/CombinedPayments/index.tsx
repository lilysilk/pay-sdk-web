import type { FC } from "react";
import { lazy, useState, useCallback, useMemo, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import {
  combinedPaymentsRenderStatesAtom,
  combinedPaymentsRenderAllFailedAtom,
} from "@/atom";
import type { ConsultPaymentItemSSD, RenderStatus } from "@/types";
import { getCurrentUrl } from "@/utils";
import { useMemoizedFn, useCurrentTime } from "@/hooks";
import { EnvironmentContext } from "@/components/EnvironmentContext";
import LazyLoadWrapper from "@/components/LazyLoadWrapper";

// 懒加载所有支付组件
const PCICard = lazy(
  () => import("@/components/PaymentServiceProviders/PCICard")
);
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

interface ConfirmPaymentParams {
  pspType: string;
  paymentType: string;
  pspId?: string;
  lpsCardToken?: string;
  lpsCardTokenVersion?: string;
  walletInfo?: {
    intentId: string;
    customerId: string;
  };
  cardInfo?: {
    lpsCardToken: string;
    lpsCardTokenVersion: string;
    kmsVersionId: string;
    isServer: boolean;
  };
}

interface CombinedPaymentsProps {
  orderId: string;
  countryCode: string;
  forterTokenCookie: string;
  paymentServiceProviders: ConsultPaymentItemSSD[];
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const CombinedPayments: FC<CombinedPaymentsProps> = ({
  orderId,
  countryCode,
  forterTokenCookie,
  paymentServiceProviders,
  onComplete,
  onPaymentMethodSelected,
  onError,
  onSubmit,
}) => {
  const { confirmPayment } = useContext(EnvironmentContext)!;
  const getCurrentTime = useCurrentTime(orderId);
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
        paymentOrderId: orderId,
        returnUrl: getCurrentUrl(),
        authenticationData: payment.walletInfo,
        paymentMethod: {
          ...payment.cardInfo,
          shopCustomer: {
            accountId: 11111,
            isLogin: true,
            email: "jdoe@example.com",
            shopId: 10001,
          },
        },
        riskMetadata: {
          checkoutTime: getCurrentTime(),
          forterTokenCookie,
        },
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
    if (item.type === "PCICARD") {
      return (
        <PCICard
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === "ADYEN") {
      return (
        <Adyen
          countryCode={countryCode}
          config={item}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      );
    }
    if (item.type === "AIRWALLEX") {
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
    if (item.type === "CHECKOUT") {
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
    if (item.type === "KLARNA") {
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
    if (item.type === "NUVEI") {
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
    if (item.type === "PAYPAL") {
      return (
        <Paypal
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

  return (
    <>
      <LazyLoadWrapper name="PCICARD" onStatusChange={handleStatusChange}>
        <PCICard
          onPaymentMethodSelected={onPaymentMethodSelected}
          onSubmit={handleSubmit}
          onComplete={onComplete}
          onError={onError}
        />
      </LazyLoadWrapper>
      {paymentServiceProviders.map((item) => {
        return (
          <LazyLoadWrapper
            key={item.type}
            name={item.type}
            onStatusChange={handleStatusChange}
          >
            {renderPaymentServiceProvider(item)}
          </LazyLoadWrapper>
        );
      })}
    </>
  );
};

export default CombinedPayments;
