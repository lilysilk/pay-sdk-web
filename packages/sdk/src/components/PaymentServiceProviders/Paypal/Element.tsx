import type { FC } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PaymentError } from "@/utils";
import Loading from "@/components/Loading";

interface PaypalElementProps {
  fundingSource?: "paypal" | "paylater";
  onSubmit?: () => Promise<any>;
  onComplete?: () => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const PaypalElement: FC<PaypalElementProps> = ({
  onSubmit,
  onComplete,
  onError,
}) => {
  const [{ isPending, isResolved }] = usePayPalScriptReducer();

  if (isPending) {
    return <Loading />;
  }

  return (
    isResolved && (
      <PayPalButtons
        style={{ label: "paypal", layout: "vertical", tagline: false }}
        disabled={false}
        createOrder={async () => {
          const order = await onSubmit?.();
          return order;
        }}
        onApprove={async () => {
          const payment = await onComplete?.();
          return payment;
        }}
        onError={(error) => {
          // 错误处理要根据需求来处理
          if (error.toString().includes("close")) {
            return;
          }
          onError?.(PaymentError.businessError(error.toString()));
        }}
      />
    )
  );
};

export default PaypalElement;
