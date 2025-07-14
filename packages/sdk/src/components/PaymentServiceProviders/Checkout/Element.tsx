import { useRef, useEffect, type FC } from "react";
import { useMemoizedFn } from "@/hooks";
import type {
  CheckoutWebComponents,
  Component,
  ComponentNameUnion,
  ComponentOptions,
  ApplepayComponentOptions,
  CardComponentOptions,
  GooglepayComponentOptions,
  WalletComponentOptions,
  FlowComponentOptions,
} from "@checkout.com/checkout-web-components";

type ComponentOptionsByComponentName = {
  /**
   * Options for Alipay CN.
   */
  alipay_cn: ComponentOptions;
  /**
   * Options for Alipay HK.
   */
  alipay_hk: ComponentOptions;
  /**
   * Options for Alma.
   */
  alma: ComponentOptions;
  /**
   * Options for Apple Pay.
   */
  applepay: ApplepayComponentOptions;
  /**
   * Options for Bancontact.
   */
  bancontact: ComponentOptions;
  /**
   * Options for Benefit.
   */
  benefit: ComponentOptions;
  /**
   * Options for Card.
   */
  card: CardComponentOptions;
  /**
   * Options for DANA.
   */
  dana: ComponentOptions;
  /**
   * Options for EPS.
   */
  eps: ComponentOptions;
  /**
   * Options for GCash.
   */
  gcash: ComponentOptions;
  /**
   * Options for Google Pay.
   */
  googlepay: GooglepayComponentOptions;
  /**
   * Options for iDEAL.
   */
  ideal: ComponentOptions;
  /**
   * Options for Kakao Pay.
   */
  kakaopay: ComponentOptions;
  /**
   * Options for Klarna.
   */
  klarna: ComponentOptions;
  /**
   * Options for KNET.
   */
  knet: ComponentOptions;
  /**
   * Options for MB WAY.
   */
  mbway: ComponentOptions;
  /**
   * Options for Multibanco.
   */
  multibanco: ComponentOptions;
  /**
   * Options for Przelewy24.
   */
  p24: ComponentOptions;
  /**
   * Options for PayPal.
   */
  paypal: WalletComponentOptions;
  /**
   * Options for QPay.
   */
  qpay: ComponentOptions;
  /**
   * Options for SEPA.
   */
  sepa: ComponentOptions;
  /**
   * Options for stc pay.
   */
  stcpay: ComponentOptions;
  /**
   * Options for Tabby.
   */
  tabby: ComponentOptions;
  /**
   * Options for Tamara.
   */
  tamara: ComponentOptions;
  /**
   * Options for Touch 'n Go.
   */
  tng: ComponentOptions;
  /**
   * Options for TrueMoney.
   */
  truemoney: ComponentOptions;
  /**
   * Options for Flow.
   */
  flow: FlowComponentOptions;
};

interface CheckoutElementPropss<T extends ComponentNameUnion> {
  initCheckoutPromise: Promise<CheckoutWebComponents>;
  name: T;
  extraOptions?: Partial<ComponentOptionsByComponentName[T]>;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const CheckoutElement = <T extends ComponentNameUnion>({
  initCheckoutPromise,
  name,
  extraOptions,
  onError,
  onSubmit,
  onComplete,
}: CheckoutElementPropss<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Component>();
  const isUnmountedRef = useRef(false);

  const initElement = useMemoizedFn(async () => {
    const checkout = await initCheckoutPromise;
    const element = checkout.create(name, {
      ...{
        onReady: (component) => {
          // 可以做loading展示
        },
        onError(component, error) {
          onError?.(error);
        },
        onSubmit(component) {
          // 点击按钮发起支付 需要调用confirm

          onSubmit?.({});
        },
        onPaymentCompleted(component, payment) {
          // 支付完成 需要调用complete
          onComplete?.(payment);
        },
      },
      ...extraOptions,
    });
    if (!isUnmountedRef.current) {
      elementRef.current = element;
      element.mount(containerRef.current!);
    }
  });

  useEffect(() => {
    initElement();

    return () => {
      isUnmountedRef.current = true;
      elementRef.current?.unmount();
      elementRef.current = undefined;
    };
  }, []);
  return <div ref={containerRef} />;
};

export default CheckoutElement;
