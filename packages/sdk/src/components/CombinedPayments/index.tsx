import type { FC } from "react";
import { lazy, useState, useCallback, useMemo, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMemoizedFn } from "@/hooks";
import type { ConsultPaymentItemSSD } from "@/types";
import { EnvironmentContext } from "@/components/EnvironmentContext";
import LazyLoadWrapper, {
  type ComponentStatus,
} from "@/components/LazyLoadWrapper";

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

interface CombinedPaymentsProps {
  countryCode: string;
  paymentServiceProviders: ConsultPaymentItemSSD[];
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const CombinedPayments: FC<CombinedPaymentsProps> = ({
  countryCode,
  paymentServiceProviders,
  onComplete,
  onPaymentMethodSelected,
  onError,
  onSubmit,
}) => {
  const { confirmPayment } = useContext(EnvironmentContext)!;
  // 组件状态管理
  const [componentStates, setComponentStates] = useState<
    Record<string, ComponentStatus>
  >({});

  // 状态变化处理器
  const handleStatusChange = useCallback(
    (name: string, status: ComponentStatus) => {
      setComponentStates((prev) => ({ ...prev, [name]: status }));
    },
    []
  );

  // 计算统计信息
  const stats = useMemo(() => {
    const entries = Object.entries(componentStates);
    const total = entries.length;
    const success = entries.filter(([, status]) => status === "success").length;
    const error = entries.filter(([, status]) => status === "error").length;
    const loading = entries.filter(([, status]) => status === "loading").length;

    return { total, success, error, loading };
  }, [componentStates]);

  // 检查是否所有组件都失败了（只有在有组件的情况下）
  const allComponentsFailed = stats.total > 0 && stats.error === stats.total;

  const { mutateAsync: confirmPaymentMutateAsync } = useMutation({
    mutationFn: async (payment: any) => {
      const res = await confirmPayment("123");
      return res;
    },
    onSuccess(data) {},
    onError(error) {
      onError?.(error);
    },
  });

  const handleSubmit = useMemoizedFn(async (payment: any) => {
    onSubmit?.("123", "123");
    return confirmPaymentMutateAsync(payment);
  });

  // 如果所有组件都失败，显示总的回退UI
  if (allComponentsFailed) {
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
        <h3 style={{ color: "#ff6b6b", margin: "0 0 10px 0" }}>
          Payment Services Unavailable
        </h3>
        <p style={{ color: "#666", margin: "0 0 10px 0" }}>
          All {stats.total} payment providers are currently unavailable. Please
          try again later.
        </p>
        <div style={{ fontSize: "14px", color: "#888", marginBottom: "15px" }}>
          Failed: {stats.error}/{stats.total}
        </div>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => {
            setComponentStates({}); // 重置状态
            window.location.reload();
          }}
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
      {paymentServiceProviders.map((item) => {
        return (
          <LazyLoadWrapper name={item.type} onStatusChange={handleStatusChange}>
            {renderPaymentServiceProvider(item)}
          </LazyLoadWrapper>
        );
      })}
    </>
  );
};

export default CombinedPayments;
