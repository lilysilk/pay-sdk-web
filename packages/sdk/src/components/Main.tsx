import { useEffect, type FC } from "react";
import { Provider } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { useMemoizedFn } from "@/hooks";
import { getPaymentStatuss, consultPayment, completePayment } from "@/api";
import Container from "./Container";
import CombinedPayments from "./CombinedPayments";

interface MainProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onCompleted?: (orderId: string, paymentMethod: string) => void;
  onError?: (error: Error) => void;
}

const Main: FC<MainProps> = ({
  onError,
  onPaymentMethodSelected,
  onCompleted,
  onSubmit,
}) => {
  const {
    data,
    mutate: initPayment,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: async () => {
      const statusRes = await getPaymentStatuss("123");
      const consultRes = await consultPayment("123");
      return {
        status: statusRes,
        consult: consultRes,
      };
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  const { mutateAsync: completePaymentMutateAsync } = useMutation({
    mutationFn: async (payment: any) => {
      const res = await completePayment("123");
      return res;
    },
    onSuccess(data) {
      console.log(data);
      onCompleted?.("123", "123");
    },
    onError(error) {
      onError?.(error);
    },
  });

  const handleComlete = useMemoizedFn(async (payment: any) => {
    return completePaymentMutateAsync(payment);
  });

  const handleError = useMemoizedFn((error: Error) => {
    onError?.(error);
  });

  useEffect(() => {
    initPayment();
  }, []);

  return (
    <Container>
      <Provider>
        {error ? (
          <div>
            {error.message}
            <button onClick={() => reset()}>Reset</button>
          </div>
        ) : isPending ? (
          <div>Loading...</div>
        ) : (
          <CombinedPayments
            paymentServiceProviders={[]}
            onComplete={handleComlete}
            onPaymentMethodSelected={onPaymentMethodSelected}
            onError={handleError}
            onSubmit={onSubmit}
          />
        )}
      </Provider>
    </Container>
  );
};

export default Main;
