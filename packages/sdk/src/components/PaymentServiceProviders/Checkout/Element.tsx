import { useRef, useEffect, type FC } from "react";
import { useMemoizedFn } from "@/hooks";
import {
  type CheckoutWebComponents,
  type Component,
} from "@checkout.com/checkout-web-components";

interface CheckoutElementProps {
  initCheckoutPromise: CheckoutWebComponents;
}

const CheckoutElement: FC<CheckoutElementProps> = ({ initCheckoutPromise }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Component>();

  const initElement = useMemoizedFn(async () => {
    const element = await initCheckoutPromise.create("card", {
      showPayButton: true,
    });
    elementRef.current = element;
    element.mount(containerRef.current!);
  });

  useEffect(() => {
    initElement();

    return () => {
      elementRef.current?.unmount();
      elementRef.current = undefined;
    };
  }, []);
  return <div ref={containerRef} />;
};

export default CheckoutElement;
