import { useRef, useEffect, type FC } from "react";
import { AdyenCheckout, Dropin } from "@adyen/adyen-web/auto";
import { useMemoizedFn } from "@/hooks";

interface AdyenDropInProps {}

const AdyenDropIn: FC<AdyenDropInProps> = ({}) => {
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
      },
      onError: (error) => {
        console.log(error);
      },
      onPaymentCompleted: (result) => {
        console.log(result);
      },
      onPaymentFailed: (error) => {
        console.log(error);
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
