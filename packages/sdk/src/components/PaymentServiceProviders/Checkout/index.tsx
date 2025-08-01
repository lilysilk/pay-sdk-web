import { useState, useEffect, useContext, type FC } from "react";
import {
  loadCheckoutWebComponents,
  type CheckoutWebComponents,
  type ComponentNameUnion,
  type Component,
} from "@checkout.com/checkout-web-components";
import {
  type ConsultCheckoutSSD,
  type ConsultPaymentMethodSSD,
  type PSPType,
  PSP,
} from "@/types";
import { isApplePaySupported, PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentContext } from "@/components/EnvironmentContext";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import CheckoutElement from "./Element";

interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  external?: Record<string, any>;
}

interface CompleteData {
  pspType: PSPType;
  paymentType: string;
}

interface CheckoutProps {
  config: ConsultCheckoutSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: SubmitData) => Promise<any>;
  onComplete?: (payment: CompleteData) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const Checkout: FC<CheckoutProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const { env } = useContext(EnvironmentContext)!;
  const [checkout, setCheckout] = useState<CheckoutWebComponents | null>(null);
  const checkoutEnv = env === "prod" ? "production" : "sandbox";

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const client = await loadCheckoutWebComponents({
          // 看下需不需要加到依赖数组
          paymentSession: config.authMeta,
          publicKey: config.merchantConfiguration.publicKey,
          environment: checkoutEnv,
          // 需要根据storeCode或者当前浏览器语言来确定
          locale: "en-US",
        });
        setCheckout(client);
      } catch (error) {
        handleError?.(PaymentError.initError((error as Error)?.message));
        setCheckout(null);
      }
    };
    initCheckout();
  }, [checkoutEnv, config.merchantConfiguration.publicKey]);

  const handleSubmit = useMemoizedFn(async (type: string) => {
    return onSubmit?.({
      pspType: PSP.CHECKOUT,
      paymentType: type,
      pspId: config.id,
      external: {
        authenticationData: {
          ckoPaymentSessionId: config.authMeta?.id,
        },
      },
    });
  });

  const handleComplete = useMemoizedFn(async (type: string) => {
    onComplete?.({
      pspType: PSP.CHECKOUT,
      paymentType: type,
    });
  });

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
    onError?.(error);
  });

  const handleClick = useMemoizedFn(async (component: Component) => {
    // 点击时触发的事件事件 埋点可能会需要 可能不需要再onSubmit里触发confirm
    console.log("************************");
    return {
      continue: true,
    };
  });

  const renderElement = (
    method: ConsultPaymentMethodSSD,
    checkout: CheckoutWebComponents
  ) => {
    const extraOptions =
      method.type === "googlepay"
        ? {
            buttonType: "fill",
            handleClick,
          }
        : method.type === "applepay"
        ? {
            handleClick,
          }
        : {};

    return (
      <CheckoutElement
        name={method.type as ComponentNameUnion}
        extraOptions={extraOptions}
        checkout={checkout}
        onSubmit={handleSubmit}
        onComplete={handleComplete}
        onError={handleError}
      />
    );
  };

  return (
    checkout &&
    config.paymentConfiguration.paymentMethods.map((method) => {
      if (method.type === "applepay" && !isApplePaySupported) {
        return null;
      }

      return (
        <PaymentMethodCard
          key={method.type}
          id={`checkou-${method.type}`}
          title={method.name}
          onSelect={onPaymentMethodSelected}
        >
          {renderElement(method, checkout)}
        </PaymentMethodCard>
      );
    })
  );
};

export default Checkout;
