import type { FC } from "react";
import {
  init,
  createElement,
  type SwitchMethodEvent,
} from "@airwallex/components-sdk";
import {} from "@airwallex/components-sdk";
import { useEffect, useRef } from "react";
import { useMemoizedFn } from "@/hooks";

export interface AirWallexDropInIntentConfig {
  intent_id: string;
  client_secret: string;
  currency: string;
}

interface AirWallexDropInProps {
  initAirwallexPromise: ReturnType<typeof init>;
  intentConfig: AirWallexDropInIntentConfig;
}

const AirWallexDropIn: FC<AirWallexDropInProps> = ({
  initAirwallexPromise,
  intentConfig,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const initElement = useMemoizedFn(async () => {
    await initAirwallexPromise;
    const element = await createElement("dropIn", {
      // Required, dropIn use intent Id, client_secret and currency to prepare checkout
      intent_id: intentConfig.intent_id,
      client_secret: intentConfig.client_secret,
      currency: intentConfig.currency,
      // applePayRequestOptions: {
      //   countryCode: "US",
      //   billingContact: {}
      // },
      // googlePayRequestOptions: {},

      // customize the visual appearance of the dropIn element, more information can be found: https://www.airwallex.com/docs/js/payments/hosted-payment-page/#properties-appearance
      appearance: {
        mode: "light",
        variables: {
          colorBrand: "#612FFF",
        },
      },
    });
    // STEP #5: Mount the drop-in element to the empty container created previously
    element?.mount(containerRef.current!); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 4
  });

  useEffect(() => {
    initElement();

    const onReady = (event: Event) => {
      console.log("onReady", event);
    };
    const onSuccess = (event: Event) => {
      console.log("onSuccess", event);
    };
    const onError = (event: Event) => {
      console.log("onError", event);
    };
    const onCancel = (event: Event) => {
      console.log("onCancel", event);
    };
    const onClickConfirmButton = (event: Event) => {
      console.log("onClickConfirmButton", event);
    };
    const onSwitchMethod = (event: SwitchMethodEvent) => {
      console.log("onSwitchMethod", event);
    };
    containerRef.current?.addEventListener("onReady", onReady as EventListener);
    containerRef.current?.addEventListener(
      "onSuccess",
      onSuccess as EventListener
    );
    containerRef.current?.addEventListener("onError", onError as EventListener);
    containerRef.current?.addEventListener(
      "onCancel",
      onCancel as EventListener
    );
    containerRef.current?.addEventListener(
      "onClickConfirmButton",
      onClickConfirmButton as EventListener
    );
    containerRef.current?.addEventListener(
      "switchMethod",
      onSwitchMethod as EventListener
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
        "onCancel",
        onCancel as EventListener
      );
      containerRef.current?.removeEventListener(
        "onClickConfirmButton",
        onClickConfirmButton as EventListener
      );
      containerRef.current?.removeEventListener(
        "switchMethod",
        onSwitchMethod as EventListener
      );
    };
  }, []);

  return <div ref={containerRef} />;
};

export default AirWallexDropIn;
