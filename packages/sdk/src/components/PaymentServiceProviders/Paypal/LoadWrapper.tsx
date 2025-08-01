import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";

interface LoadWrapperProps extends PropsWithChildren {
  onError?: (error: PaymentError) => void;
}

const LoadWrapper: FC<LoadWrapperProps> = ({ children, onError }) => {
  const [{ isRejected, isResolved }] = usePayPalScriptReducer();

  const handleError = useMemoizedFn(() => {
    onError?.(PaymentError.initError("paypal script load failed"));
  });

  useEffect(() => {
    if (isRejected) {
      handleError();
    }
  }, [isRejected]);

  return isResolved && children;
};

export default LoadWrapper;
