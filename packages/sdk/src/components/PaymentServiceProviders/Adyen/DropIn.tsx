import { useRef, useEffect, type FC } from "react";
import { AdyenCheckout, Dropin } from "@adyen/adyen-web/auto";
import { useMemoizedFn } from "@/hooks";

interface AdyenDropInProps {
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const AdyenDropIn: FC<AdyenDropInProps> = ({
  onSubmit,
  onComplete,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Dropin>();

  const initDropin = useMemoizedFn(async () => {
    const adyenCheckout = await AdyenCheckout({
      environment: "test",
      clientKey: "test",
      locale: "en",
      countryCode: "US",
      amount: {
        value: 100,
        currency: "USD",
      },
      paymentMethodsResponse: {},
      onSubmit: (state, component, actions) => {
        console.log(state, component, actions);
        onSubmit?.({});
      },
      onError: (error) => {
        console.log(error);
        onError?.(error);
      },
      onPaymentCompleted: (result) => {
        console.log(result);
        onComplete?.({});
      },
      onPaymentFailed: (error) => {
        console.log(error);
        onError?.(new Error("failed"));
      },
    });

    elementRef.current = new Dropin(adyenCheckout, {
      openFirstPaymentMethod: false,
      openFirstStoredPaymentMethod: false,
      paymentMethodsConfiguration: {
        // 取最小单位
        applepay: {
          amount: {
            value: 100,
            currency: "USD",
          },
        },
        googlepay: {
          onClick(resolve) {
            resolve();
          },
        },
      },
      onSelect: (paymentMethod) => {
        console.log(paymentMethod);
      },
    }).mount(containerRef.current!);
  });

  useEffect(() => {
    initDropin();

    return () => {
      elementRef.current?.unmount();
      elementRef.current = undefined;
    };
  }, []);
  return <div ref={containerRef} />;
};

export default AdyenDropIn;
