import type { FC } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loading from "@/components/Loading";

interface PaypalElementProps {
  fundingSource?: "paypal" | "paylater";
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const PaypalElement: FC<PaypalElementProps> = ({
  onSubmit,
  onComplete,
  onError,
}) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  return isRejected ? (
    <div>Load Error</div>
  ) : isPending ? (
    <Loading />
  ) : (
    <PayPalButtons
      style={{ label: "paypal", layout: "vertical", tagline: false }}
      disabled={false}
      createOrder={async () => {
        const order = await onSubmit?.({});
        return order;
      }}
      onApprove={async () => {
        const payment = await onComplete?.({});
        return payment;
      }}
      onError={(error) => {
        // 错误处理要根据需求来处理
        if (error.toString().includes("close")) {
        } else {
          onError?.(new Error(error.toString()));
        }
      }}
    />
  );
};

export default PaypalElement;
