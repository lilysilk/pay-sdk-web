import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import {
  isIframeMessage,
  validateMessageOrigin,
  MESSAGE_NAMESPACE,
  type SuccessData,
} from "./utils/messageChannel";

interface CreditCardProps {
  onSubmit?: (data: SuccessData) => Promise<any> | undefined;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const CreditCard: FC<CreditCardProps> = ({ onSubmit, onComplete, onError }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const redirectUrl = useRef<string>();
  const [showThreeDS, setShowThreeDS] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(0);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const { origin, data } = event;

      // 验证消息来源
      if (!validateMessageOrigin(origin)) {
        console.warn("Message from unauthorized origin:", origin);
        return;
      }

      // 使用类型守卫确保消息格式正确
      if (!isIframeMessage(data)) {
        return;
      }

      // 验证命名空间
      if (data.namespace !== MESSAGE_NAMESPACE) {
        return;
      }

      console.log("Received message:", data);

      // 根据不同的消息类型处理，现在有完整的类型推断
      switch (data.type) {
        case "READY":
          // data.data 的类型是 { instanceId?: string }
          console.log("Iframe ready with instanceId:", data.data.instanceId);
          break;

        case "RESIZE":
          // data.data 的类型是 { width: number; height: number }
          const { height, width } = data.data;
          if (height > 0 && height <= 2000) {
            setIframeHeight(height);
          }
          console.log("Resize request:", width, height);
          break;

        case "SUCCESS":
          const { data: paymentData } = data.data;
          console.log("Payment success:", paymentData);
          try {
            const result = await onSubmit?.(paymentData);
            onComplete?.(paymentData);
          } catch (error) {
            console.error("Payment error:", error);
          }
          break;

        case "ERROR":
          // data.data 的类型是 { code: string; message: string; details?: any }
          const { code, message } = data.data;
          console.error("Payment error:", { code, message });
          break;

        default:
          // TypeScript 会确保这里是 never 类型，即所有情况都被处理了
          console.warn("Unknown message type:", data);
      }
    };

    window?.addEventListener?.("message", handleMessage);

    return () => {
      window?.removeEventListener?.("message", handleMessage);
    };
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        // src="https://static-dev.lilysilk.com/fe/card/v0.1.0-dev.19/index.html"
        src="http://localhost:3001/"
        title="PCIPay"
        width="100%"
        height={iframeHeight}
      />
      {showThreeDS && redirectUrl.current && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.06)",
            zIndex: 2147483647,
          }}
        >
          <div
            style={{
              width: "90%",
              height: "90%",
              margin: "auto",
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 48px #000000",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            role="dialog"
            aria-modal
            aria-label="3D Secure 2 Authentication"
          >
            <iframe
              id="threeDS-modal-iframe"
              title="Embedded 3D Secure 2 Authentication"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              src={redirectUrl.current}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreditCard;
