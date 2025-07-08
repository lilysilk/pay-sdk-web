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
}

const AirWallexGooglePay: FC<AirWallexGooglePayProps> = ({
  initAirwallexPromise,
  config,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<ElementTypes["googlePayButton"]>();

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

    element.mount(containerRef.current!);
    elementRef.current = element;
  });

  useEffect(() => {
    initElement();

    const onReady = () => {
      setIsReady(true);
    };
    const onSuccess = () => {};
    const onError = () => {};
    const onClick = () => {};
    const onCancel = () => {};

    containerRef.current?.addEventListener("onReady", onReady as EventListener);
    containerRef.current?.addEventListener(
      "onSuccess",
      onSuccess as EventListener
    );
    containerRef.current?.addEventListener("onError", onError as EventListener);
    containerRef.current?.addEventListener("onClick", onClick as EventListener);
    containerRef.current?.addEventListener(
      "onCancel",
      onCancel as EventListener
    );

    return () => {
      containerRef.current?.removeEventListener(
        "onReady",
        onReady as EventListener
      );
      containerRef.current?.removeEventListener(
        "onSuccess",
        onSuccess as EventListener
      );
      containerRef.current?.removeEventListener(
        "onError",
        onError as EventListener
      );
      containerRef.current?.removeEventListener(
        "onClick",
        onClick as EventListener
      );
      containerRef.current?.removeEventListener(
        "onCancel",
        onCancel as EventListener
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

export default AirWallexGooglePay;
