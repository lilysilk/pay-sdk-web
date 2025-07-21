import { useEffect, useRef, useState, type FC } from "react";
import { css } from "@emotion/react";
import { useMemoizedFn } from "@/hooks";
import {
  init,
  createElement,
  type ElementTypes,
  type Payment,
} from "@airwallex/components-sdk";
import Loading from "@/components/Loading";

export interface AirWallexApplePayConfig {
  intent_id: string;
  client_secret: string;
  currency: string;
  amount: number;
  countryCode: string;
  autoCapture: boolean;
  billing: Payment.Billing;
}

interface AirWallexApplePayProps {
  config: AirWallexApplePayConfig;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const AirWallexApplePay: FC<AirWallexApplePayProps> = ({
  config,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<ElementTypes["applePayButton"]>();
  const countRef = useRef(0);

  const initElement = useMemoizedFn(async () => {
    const currentCount = countRef.current;
    const element = await createElement("applePayButton", {
      mode: "payment",
      autoCapture: config.autoCapture,
      intent_id: config.intent_id,
      client_secret: config.client_secret,
      amount: {
        value: config.amount,
        currency: config.currency,
      },
      countryCode: config.countryCode,
      billingContact: {
        emailAddress: config?.billing?.email,
        familyName: config?.billing?.last_name,
        givenName: config?.billing?.first_name,
        phoneNumber: config?.billing?.phone_number,
        phoneticFamilyName: config?.billing?.last_name,
        phoneticGivenName: config?.billing?.first_name,
        addressLines: [config?.billing?.address?.street],
        locality: config?.billing?.address?.city,
        administrativeArea: config?.billing?.address?.state,
        postalCode: config?.billing?.address?.postcode,
        countryCode: config?.billing?.address?.country_code,
      },
    });

    if (currentCount === countRef.current) {
      element.mount(containerRef.current!);
      elementRef.current = element;
    }
  });

  useEffect(() => {
    countRef.current++;
    initElement();

    const handleReady = () => {
      setIsReady(true);
    };
    const handleSuccess = () => {
      onComplete?.({});
    };
    const handleError = (event: CustomEvent) => {
      onError?.(new Error(event.detail));
    };
    const handleClick = () => {
      onSubmit?.({});
    };
    const handleCancel = () => {};

    containerRef.current?.addEventListener(
      "onReady",
      handleReady as EventListener
    );
    containerRef.current?.addEventListener(
      "onSuccess",
      handleSuccess as EventListener
    );
    containerRef.current?.addEventListener(
      "onError",
      handleError as EventListener
    );
    containerRef.current?.addEventListener(
      "onClick",
      handleClick as EventListener
    );
    containerRef.current?.addEventListener(
      "onCancel",
      handleCancel as EventListener
    );

    return () => {
      containerRef.current?.removeEventListener(
        "onReady",
        handleReady as EventListener
      );
      containerRef.current?.removeEventListener(
        "onSuccess",
        handleSuccess as EventListener
      );
      containerRef.current?.removeEventListener(
        "onError",
        handleError as EventListener
      );
      containerRef.current?.removeEventListener(
        "onClick",
        handleClick as EventListener
      );
      containerRef.current?.removeEventListener(
        "onCancel",
        handleCancel as EventListener
      );
      elementRef.current?.unmount();
      elementRef.current = undefined;
    };
  }, []);

  return (
    <div>
      {!isReady && (
        <div
          css={css({
            display: "flex",
            justifyContent: "center",
          })}
        >
          <Loading />
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          margin: "30px auto 16px",
          display: isReady ? "block" : "none",
        }}
      ></div>
    </div>
  );
};

export default AirWallexApplePay;
