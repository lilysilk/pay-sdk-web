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
    try {
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
    } catch (error) {
      console.error("AirWallex ApplePay: There is an error", error);
      onError?.(error as Error);
    }
  });

  const handleSubmit = useMemoizedFn(async () => {
    onSubmit?.("applepay");
  });

  const handleComplete = useMemoizedFn(async () => {
    onComplete?.("applepay");
  });

  const handleError = useMemoizedFn(async (error: Error) => {
    onError?.(error);
  });

  useEffect(() => {
    countRef.current++;
    initElement();

    const handleElementReady = () => {
      setIsReady(true);
    };
    const handleElementSuccess = () => {
      handleComplete();
    };
    const handleElementError = (event: CustomEvent) => {
      console.error(
        "AirWallex ApplePay: There is an error",
        event?.detail?.error
      );

      handleError(event?.detail?.error);
    };
    const handleElementClick = () => {
      handleSubmit();
    };
    const handleElementCancel = () => {
      // 用来取消loading状态？
    };

    containerRef.current?.addEventListener(
      "onReady",
      handleElementReady as EventListener
    );
    containerRef.current?.addEventListener(
      "onSuccess",
      handleElementSuccess as EventListener
    );
    containerRef.current?.addEventListener(
      "onError",
      handleElementError as EventListener
    );
    containerRef.current?.addEventListener(
      "onClick",
      handleElementClick as EventListener
    );
    containerRef.current?.addEventListener(
      "onCancel",
      handleElementCancel as EventListener
    );

    return () => {
      containerRef.current?.removeEventListener(
        "onReady",
        handleElementReady as EventListener
      );
      containerRef.current?.removeEventListener(
        "onSuccess",
        handleElementSuccess as EventListener
      );
      containerRef.current?.removeEventListener(
        "onError",
        handleElementError as EventListener
      );
      containerRef.current?.removeEventListener(
        "onClick",
        handleElementClick as EventListener
      );
      containerRef.current?.removeEventListener(
        "onCancel",
        handleElementCancel as EventListener
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
