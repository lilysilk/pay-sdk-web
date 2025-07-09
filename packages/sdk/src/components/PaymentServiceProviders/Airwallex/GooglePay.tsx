import { useEffect, useRef, useState, type FC } from "react";
import { css } from "@emotion/react";
import { useMemoizedFn } from "@/hooks";
import {
  init,
  createElement,
  type ElementTypes,
} from "@airwallex/components-sdk";
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
  initAirwallexPromise: ReturnType<typeof init>;
  config: AirWallexGooglePayConfig;
  onSubmit?: (payment: any) => void;
  onCompleted?: (payment: any) => void;
  onError?: (error: Error) => void;
}

const AirWallexGooglePay: FC<AirWallexGooglePayProps> = ({
  initAirwallexPromise,
  config,
  onSubmit,
  onCompleted,
  onError,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<ElementTypes["googlePayButton"]>();
  const isUnmountedRef = useRef(false);

  const initElement = useMemoizedFn(async () => {
    await initAirwallexPromise;
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

    if (!isUnmountedRef.current) {
      element.mount(containerRef.current!);
      elementRef.current = element;
    }
  });

  useEffect(() => {
    initElement();

    const handdleReady = () => {
      setIsReady(true);
    };

    const handleSuccess = () => {
      onCompleted?.({});
    };

    const handleError = (event: CustomEvent) => {
      onError?.(new Error(event.detail));
    };

    const handleClick = () => {
      onSubmit?.({});
    };

    const handleCancel = () => {
      // 用来取消loading状态？
    };

    containerRef.current?.addEventListener(
      "onReady",
      handdleReady as EventListener
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
        handdleReady as EventListener
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
