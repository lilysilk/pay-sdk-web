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

const testData = {
  header: {
    "trace-id": "b35395824b73f0bdf0577c36086a2eda",
    "trace-url":
      "http://sps.beta.shopastro.com/admin-api/v1/traces/b35395824b73f0bdf0577c36086a2eda",
  },
  validateResult: [],
  data: {
    paymentServiceProviders: [
      {
        id: 665120950750466,
        merchantConfiguration: {
          spsMerchantId: "665130060779394",
          environment: "TEST",
          autoCapture: "false",
          clientId:
            "AVohRbwB-7SSFY-Ri9fc2J8lu5Wavfi09SdMVB24dL4zubjNUAuv8q0OOemeUw3hn-qgS0AiCA7x1GvD",
          webhookId: "4L584495A2105512L",
          updatePaymentAmount: "true",
          enable3DS: "false",
          clientSecret:
            "EMaHsuwjeI3zkIgq36__ANJ9hgdfs4HGKRv3pAzXNN9wYORBdb12xek3nuW3O40mAUNvqeFlcuEQr_30",
          spsMerchantAlias: "PAYPAL-1",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "paypal",
              type: "wallet",
            },
            {
              name: "paypal",
              type: "fast",
            },
          ],
          storedPaymentMethods: [],
        },
        type: "PAYPAL",
        authMeta: {},
        sort: 0,
        localPaySort: 0,
      },
      {
        id: 665120950750464,
        merchantConfiguration: {
          spsMerchantId: "708446299307815",
          autoCapture: "false",
          environment: "TEST",
          payEnvironment: "live-us",
          clientKey: "test_6CLPOYJUKBAY7FH2UPOEJJRD4Q64TA5Y",
          enable3DS: "true",
          spsRemoveKeys:
            "ApiKey,merchantAccount,webhookHmachey,webhookUsername,webhookPassword",
          spsMerchantAlias: "ADYEN-2",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "クレジットカード",
              type: "scheme",
              brands: ["amex", "mc", "visa"],
              sort: 1,
            },
            {
              name: "Apple Pay",
              type: "applepay",
              configuration: {
                merchantId: "000000000208560",
                merchantName: "Lilysilk072_SHOPASTRO_TEST",
              },
              brands: ["amex", "jcb", "mc", "visa"],
              sort: 2,
            },
            {
              name: "Google Pay",
              type: "googlepay",
              configuration: {
                merchantId: "50",
                gatewayMerchantId: "Lilysilk072_SHOPASTRO_TEST",
              },
              sort: 3,
            },
          ],
          storedPaymentMethods: [],
        },
        type: "ADYEN",
        sort: 0,
        localPaySort: 0,
      },
    ],
  },
  success: true,
};

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
      // const consultRes = await consultPayment({
      //   req_id: "web",
      //   // paymentOrderId: orderId,
      //   paymentOrderId: "1151236977159300",
      //   countryCode: countryCode,
      //   website: website,
      //   paymentGroup: "wallet",
      //   metadata: {
      //     returnUrl:
      //       "https://shop.dev-shop.lilysilk.com/us/checkout?checkout-order-id=1151238690131984&unique-code=M8fcgrx0NalazpOU0su1bE5Co8ANYNK6rPsB00ehF5Y%3D&sps-id=1151236977159300",
      //   },
      // });
      return {
        status: true,
        // consult: consultRes,
        consult: testData,
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
