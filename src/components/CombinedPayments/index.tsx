import type { FC } from "react";
import React, {
  lazy,
  Suspense,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

// 懒加载所有支付组件
const PCICard = lazy(() => import("../PaymentServiceProviders/PCICard"));
const Adyen = lazy(() => import("../PaymentServiceProviders/Adyen"));
const Airwallex = lazy(() => import("../PaymentServiceProviders/Airwallex"));
const Checkout = lazy(() => import("../PaymentServiceProviders/Checkout"));
const Klarna = lazy(() => import("../PaymentServiceProviders/Klarna"));
const Nuvei = lazy(() => import("../PaymentServiceProviders/Nuvei"));
const Paypal = lazy(() => import("../PaymentServiceProviders/Paypal"));

interface CombinedPaymentsProps {}

// 组件状态类型
type ComponentStatus = "loading" | "success" | "error";

// 支付组件包装器 - 智能状态管理
const PaymentProviderWrapper: FC<{
  children: React.ReactNode;
  name: string;
  onStatusChange: (name: string, status: ComponentStatus) => void;
}> = ({ children, name, onStatusChange }) => {
  // 初始化为loading状态
  useEffect(() => {
    onStatusChange(name, "loading");
  }, [name, onStatusChange]);

  return (
    <ErrorBoundary
      fallback={null} // 静默失败，什么都不显示
      onError={(error) => {
        console.error(`${name} failed to load:`, error);
        onStatusChange(name, "error");
      }}
    >
      <Suspense fallback={null}>
        <ComponentSuccessTracker name={name} onSuccess={onStatusChange}>
          {children}
        </ComponentSuccessTracker>
      </Suspense>
    </ErrorBoundary>
  );
};

// 成功状态追踪器
const ComponentSuccessTracker: FC<{
  children: React.ReactNode;
  name: string;
  onSuccess: (name: string, status: ComponentStatus) => void;
}> = ({ children, name, onSuccess }) => {
  // 组件渲染成功时调用
  useEffect(() => {
    onSuccess(name, "success");
  }, [name, onSuccess]);

  return <>{children}</>;
};

const CombinedPayments: FC<CombinedPaymentsProps> = ({}) => {
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

  return (
    <div>
      <PaymentProviderWrapper
        name="PCICard"
        onStatusChange={handleStatusChange}
      >
        <PCICard />
      </PaymentProviderWrapper>

      <PaymentProviderWrapper name="Adyen" onStatusChange={handleStatusChange}>
        <Adyen />
      </PaymentProviderWrapper>

      <PaymentProviderWrapper
        name="Airwallex"
        onStatusChange={handleStatusChange}
      >
        <Airwallex />
      </PaymentProviderWrapper>

      <PaymentProviderWrapper
        name="Checkout"
        onStatusChange={handleStatusChange}
      >
        <Checkout />
      </PaymentProviderWrapper>

      <PaymentProviderWrapper name="Klarna" onStatusChange={handleStatusChange}>
        <Klarna />
      </PaymentProviderWrapper>

      <PaymentProviderWrapper name="Nuvei" onStatusChange={handleStatusChange}>
        <Nuvei />
      </PaymentProviderWrapper>

      <PaymentProviderWrapper name="Paypal" onStatusChange={handleStatusChange}>
        <Paypal />
      </PaymentProviderWrapper>
    </div>
  );
};

export default CombinedPayments;
