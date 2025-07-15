import { useEffect, useContext, type FC } from "react";
import { Provider as JotaiProvider } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentContext } from "./EnvironmentContext";
import Container from "./Container";
import CombinedPayments from "./CombinedPayments";

interface MainProps {
  countryCode: string;
  website: string;
  locale: string;
  currency: string;
  amount: number;
  orderId: string;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onCompleted?: (orderId: string, paymentMethod: string) => void;
  onError?: (error: Error) => void;
}

const Main: FC<MainProps> = ({
  locale,
  countryCode,
  website,
  currency,
  amount,
  orderId,
  onError,
  onPaymentMethodSelected,
  onCompleted,
  onSubmit,
}) => {
  const { consultPayment, completePayment, getPaymentStatuss } =
    useContext(EnvironmentContext)!;
  const {
    data,
    mutate: initPayment,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: async () => {
      // const statusRes = await getPaymentStatuss("123");
      const consultRes = await consultPayment({
        req_id: "web",
        paymentOrderId: orderId,
        countryCode: countryCode,
        website: website,
        paymentGroup: "wallet",
        metadata: {
          returnUrl:
            "https://shop.dev-shop.lilysilk.com/us/checkout?checkout-order-id=1151238690131984&unique-code=M8fcgrx0NalazpOU0su1bE5Co8ANYNK6rPsB00ehF5Y%3D&sps-id=1151236977159300",
        },
      });
      return {
        status: true,
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
      <JotaiProvider>
        {error ? (
          <div>
            {error.message}
            <button onClick={() => reset()}>Reset</button>
          </div>
        ) : isPending ? (
          <div>Loading...</div>
        ) : (
          <CombinedPayments
            countryCode={countryCode}
            paymentServiceProviders={
              data?.consult?.data?.paymentServiceProviders || []
            }
            onComplete={handleComlete}
            onPaymentMethodSelected={onPaymentMethodSelected}
            onError={handleError}
            onSubmit={onSubmit}
          />
        )}
      </JotaiProvider>
    </Container>
  );
};

export default Main;
