import { useEffect, useRef, useState, type FC } from "react";
import { css } from "@emotion/react";
import { PaymentError } from "@/utils";

import { useMemoizedFn } from "@/hooks";
import { createElement, type ElementTypes } from "@airwallex/components-sdk";
import Loading from "@/components/Loading";

export interface AirWallexGooglePayConfig {
  intent_id: string;
  client_secret: string;
  currency: string;
  amount: number;
  countryCode: string;
  merchantName: string;
}

interface AirWallexGooglePayProps {
  config: AirWallexGooglePayConfig;
  onSubmit?: (type: string) => Promise<any>;
  onComplete?: (type: string) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const AirWallexGooglePay: FC<AirWallexGooglePayProps> = ({
  config,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<ElementTypes["googlePayButton"]>();
  const countRef = useRef(0);
  const isUnmountedRef = useRef(false);

  const initElement = useMemoizedFn(async () => {
    try {
      const currentCount = countRef.current;
      const element = await createElement("googlePayButton", {
        mode: "payment",
        intent_id: config.intent_id,
        client_secret: config.client_secret,
        amount: {
          value: config.amount,
          currency: config.currency,
        },
        countryCode: config.countryCode,
        merchantInfo: {
          merchantName: config.merchantName,
        },
        buttonSizeMode: "fill",
      });

      if (currentCount === countRef.current && !isUnmountedRef.current) {
        element.mount(containerRef.current!);
        elementRef.current = element;
      }
    } catch (error) {
      console.error("AirWallex GooglePay: There is an error", error);
      onError?.(PaymentError.businessError((error as Error)?.message));
    }
  });

  const handleSubmit = useMemoizedFn(async () => {
    onSubmit?.("googlepay");
  });

  const handleComplete = useMemoizedFn(async () => {
    onComplete?.("googlepay");
  });

  const handleError = useMemoizedFn(async (error: Error) => {
    onError?.(PaymentError.businessError(error?.message));
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
        "AirWallex GooglePay: There is an error",
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
      isUnmountedRef.current = true;
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

export default AirWallexGooglePay;
