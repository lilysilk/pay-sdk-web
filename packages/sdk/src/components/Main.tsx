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
    "trace-id": "ad787522b24f420ee4df1ccd2f898f81",
    "trace-url":
      "http://sps.beta.shopastro.com/admin-api/v1/traces/ad787522b24f420ee4df1ccd2f898f81",
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
        sort: 1,
        localPaySort: 0,
      },
      {
        id: 665120950750467,
        merchantConfiguration: {
          environmentRegion: "-na",
          spsMerchantId: "699178850366768",
          environment: "TEST",
          autoCapture: "false",
          clientId: "PN10036_c40cf1458222",
          clientSecret: "sfAL3X2SqCfZ3pyR",
          spsMerchantAlias: "KLARNA-english",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "Pay over time",
              type: "klarna_sps_pay_over_time",
              metadata: {
                asset_urls: {
                  descriptive:
                    "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
                  standard:
                    "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
                },
                identifier: "pay_over_time",
              },
              sort: 1,
            },
          ],
          storedPaymentMethods: [],
        },
        type: "KLARNA",
        authMeta: {
          session_id: "fbb6ff72-dc67-6e48-bb82-d0f000bb7b45",
          token:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMzA1ZWJjLWI4MTEtMzYzNy1hYTRjLTY2ZWNhMTg3NGYzZCJ9.eyJzZXNzaW9uX2lkIjoiZmJiNmZmNzItZGM2Ny02ZTQ4LWJiODItZDBmMDAwYmI3YjQ1IiwiYmFzZV91cmwiOiJodHRwczovL2pzLnBsYXlncm91bmQua2xhcm5hLmNvbS9uYS9rcCIsImRlc2lnbiI6ImtsYXJuYSIsImxhbmd1YWdlIjoiZW4iLCJwdXJjaGFzZV9jb3VudHJ5IjoiVVMiLCJlbnZpcm9ubWVudCI6InBsYXlncm91bmQiLCJtZXJjaGFudF9uYW1lIjoiWW91ciBidXNpbmVzcyBuYW1lIiwic2Vzc2lvbl90eXBlIjoiUEFZTUVOVFMiLCJjbGllbnRfZXZlbnRfYmFzZV91cmwiOiJodHRwczovL25hLnBsYXlncm91bmQua2xhcm5hZXZ0LmNvbSIsInNjaGVtZSI6dHJ1ZSwiZXhwZXJpbWVudHMiOlt7Im5hbWUiOiJrcGMtb3NtLXdpZGdldCIsInZhcmlhdGUiOiJ2MSJ9LHsibmFtZSI6ImtwYy1hYmUiLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn0seyJuYW1lIjoia3BjLXBzZWwtNDQyOSIsInZhcmlhdGUiOiJhIn0seyJuYW1lIjoia3AtY2xpZW50LW9uZS1wdXJjaGFzZS1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwYy0xay1zZXJ2aWNlIiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtc3RhdGljLXdpZGdldCIsInZhcmlhdGUiOiJpbmRleCIsInBhcmFtZXRlcnMiOnsiZHluYW1pYyI6InRydWUifX0seyJuYW1lIjoia3AtY2xpZW50LXV0b3BpYS1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtc2RrLWZsb3ciLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn0seyJuYW1lIjoia3AtY2xpZW50LXV0b3BpYS13ZWJ2aWV3LWZsb3ciLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn1dLCJyZWdpb24iOiJ1cyIsIm9yZGVyX2Ftb3VudCI6NTU2MDAsIm9mZmVyaW5nX29wdHMiOjIsIm9vIjoiN2ciLCJ2ZXJzaW9uIjoidjEuMTAuMC0xNTkwLWczZWJjMzkwNyJ9.hgEAaOSYoKfHeYVxIFg5C-nezN5Je-vgw0g4azT5gR4JeK5TfkWmt842holK63krdWvqqVPqJpF5HbpHGY6kYRFZYr6hEVWmFFMvWoq73xSykXZwhTmtb0oKshhTzt6AtjYv80nK5v0BQit4I-q_pwF7DjiGI0GJLDqGlzie69C7MiVzBygHn-n2-ksQJcxtggXILOzNbeG1XJUTyXeaicMgbNLooXzfz05sXuvsPstpMdQcefYI5Mu-PRQuZm9MMXSewzFsCMT5oT-ZhWaZSVqzxF-BwbLh3bS3c399hbBUGAivPO4RUkQeWoJRr9mCyFh4vj0P_-Mb7jco9yoZgQ",
        },
        sort: 3,
        localPaySort: 0,
      },
      {
        id: 665120950750468,
        merchantConfiguration: {
          spsMerchantId: "816563368625024",
          environment: "TEST",
          autoCapture: "false",
          enable3DS: "true",
          spsRemoveKeys: "secretKey,processing_channel_id,signature_key",
          publicKey: "pk_sbox_hnm4eeothapejqqez7nifckcuu7",
          spsMerchantAlias: "CHECKOUT-1",
        },
        paymentConfiguration: {
          paymentMethods: [
            {
              name: "Apple Pay",
              type: "applepay",
              brands: ["visa", "masterCard", "amex"],
            },
            {
              name: "Google Pay",
              type: "googlepay",
            },
            {
              name: "Credit Card",
              type: "card",
              brands: ["Visa", "Mastercard", "Amex"],
            },
          ],
          storedPaymentMethods: [],
        },
        type: "CHECKOUT",
        authMeta: {
          payment_session_secret: "pss_123f73de-f188-4756-b2fc-b644f51fe09f",
          _links: {
            self: {
              href: "https://api.sandbox.checkout.com/payment-sessions/ps_302YjKZkMB6VhMYLU2NZtUPSjpt",
            },
          },
          payment_session_token:
            "YmFzZTY0:eyJpZCI6InBzXzMwMllqS1prTUI2VmhNWUxVMk5adFVQU2pwdCIsImVudGl0eV9pZCI6ImVudF9seXplaGRiN2w1aXpsb3RpdXZqdWlpczRieSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfaDdjZmZteWJ1Y2xlcGppeWJseGppZG9jZnEiLCJhbW91bnQiOjU1NjAwLCJsb2NhbGUiOiJlbi1HQiIsImN1cnJlbmN5IjoiVVNEIiwicGF5bWVudF9tZXRob2RzIjpbeyJ0eXBlIjoiY2FyZCIsImNhcmRfc2NoZW1lcyI6WyJWaXNhIiwiTWFzdGVyY2FyZCIsIkFtZXgiXSwic2NoZW1lX2Nob2ljZV9lbmFibGVkIjpmYWxzZSwic3RvcmVfcGF5bWVudF9kZXRhaWxzIjoiZGlzYWJsZWQiLCJiaWxsaW5nX2FkZHJlc3MiOnsiYWRkcmVzc19saW5lMSI6IjExMjM0IEFuZGVyc29uIFN0ICAgICIsImFkZHJlc3NfbGluZTIiOiIiLCJjaXR5IjoiTG9tYSBMaW5kYSIsInN0YXRlIjoiQ0EiLCJ6aXAiOiI5MjM1MC0xNzE2IiwiY291bnRyeSI6IlVTIn19LHsidHlwZSI6ImFwcGxlcGF5IiwiZGlzcGxheV9uYW1lIjoiTmFuSmluZyIsImNvdW50cnlfY29kZSI6IkdCIiwiY3VycmVuY3lfY29kZSI6IlVTRCIsIm1lcmNoYW50X2NhcGFiaWxpdGllcyI6WyJzdXBwb3J0czNEUyJdLCJzdXBwb3J0ZWRfbmV0d29ya3MiOlsidmlzYSIsIm1hc3RlckNhcmQiLCJhbWV4Il0sInRvdGFsIjp7ImxhYmVsIjoiTmFuSmluZyIsInR5cGUiOiJmaW5hbCIsImFtb3VudCI6IjU1NiJ9fSx7InR5cGUiOiJnb29nbGVwYXkiLCJtZXJjaGFudCI6eyJpZCI6IjA4MTEzMDg5Mzg2MjY4ODQ5OTgyIiwibmFtZSI6Ik5hbkppbmciLCJvcmlnaW4iOiJodHRwczovL3Nob3AuZGV2LXNob3AubGlseXNpbGsuY29tIn0sInRyYW5zYWN0aW9uX2luZm8iOnsidG90YWxfcHJpY2Vfc3RhdHVzIjoiRklOQUwiLCJ0b3RhbF9wcmljZSI6IjU1NiIsImNvdW50cnlfY29kZSI6IkdCIiwiY3VycmVuY3lfY29kZSI6IlVTRCJ9LCJjYXJkX3BhcmFtZXRlcnMiOnsiYWxsb3dlZF9hdXRoX21ldGhvZHMiOlsiUEFOX09OTFkiLCJDUllQVE9HUkFNXzNEUyJdLCJhbGxvd2VkX2NhcmRfbmV0d29ya3MiOlsiVklTQSIsIk1BU1RFUkNBUkQiLCJBTUVYIl19fV0sImZlYXR1cmVfZmxhZ3MiOlsiYW5hbHl0aWNzX29ic2VydmFiaWxpdHlfZW5hYmxlZCIsImNhcmRfZmllbGRzX2VuYWJsZWQiLCJnZXRfd2l0aF9wdWJsaWNfa2V5X2VuYWJsZWQiLCJsb2dzX29ic2VydmFiaWxpdHlfZW5hYmxlZCIsInJpc2tfanNfZW5hYmxlZCIsInVzZV9ub25fYmljX2lkZWFsX2ludGVncmF0aW9uIl0sInJpc2siOnsiZW5hYmxlZCI6ZmFsc2V9LCJtZXJjaGFudF9uYW1lIjoiTmFuSmluZyIsInBheW1lbnRfc2Vzc2lvbl9zZWNyZXQiOiJwc3NfMTIzZjczZGUtZjE4OC00NzU2LWIyZmMtYjY0NGY1MWZlMDlmIiwiaW50ZWdyYXRpb25fZG9tYWluIjoiYXBpLnNhbmRib3guY2hlY2tvdXQuY29tIn0=",
          id: "ps_302YjKZkMB6VhMYLU2NZtUPSjpt",
        },
        sort: 2,
        localPaySort: 4,
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
