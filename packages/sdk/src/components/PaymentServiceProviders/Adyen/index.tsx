import { useEffect, useState, type FC } from "react";
import { includes } from "lodash-es";
import { AdyenCheckout, type Core } from "@adyen/adyen-web";
import "@adyen/adyen-web/styles/adyen.css";
import type { ConsultAdyenSSD, ConsultAdyenPaymentMethodSSD } from "@/types";
import { isApplePaySupported } from "@/utils";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import AdyenKlarna from "./Klarna";
import AdyenGooglePay from "./GooglePay";
import AdyenApplePay from "./ApplePay";
import AdyenAfterPay from "./AfterPay";
import AdyenAfterPayB2B from "./AfterPayB2B";
import AdyenRedirect from "./Redirect";
import AdyenEcontext from "./Econtext";
import AdyenTrustly from "./Trustly";
import AdyenPayByBank from "./PayByBank";
import AdyenPayByBankUS from "./PayByBankUS";
import AdyenAtome from "./Atome";
import AdyenDotpay from "./Dotpay";
import AdyenOnlineBankingCZ from "./OnlineBankingCZ";
import AdyenOnlineBankingIN from "./OnlineBankingIN";
import AdyenOnlineBankingPL from "./OnlineBankingPL";
import AdyenOnlineBankingSK from "./OnlineBankingSK";
import AdyenMolPayEBankingMY from "./MolPayEBankingMY";
import AdyenMolPayEBankingTH from "./MolPayEBankingTH";

interface AdyenProps {
  countryCode: string;
  config: ConsultAdyenSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const Adyen: FC<AdyenProps> = ({
  countryCode,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [adyenCheckout, setAdyenCheckout] = useState<Core | null>(null);

  useEffect(() => {
    const initAdyenCheckout = async () => {
      try {
        const client = await AdyenCheckout({
          environment: "test",
          clientKey: config.merchantConfiguration.clientKey,
          locale: "en-US",
          countryCode,
          amount: {
            value: 10000,
            currency: "EUR",
          },
          onSubmit: (state, component, actions) => {
            console.log(state, component, actions);
            onSubmit?.({});
            // actions.resolve({
            //   resultCode: "Authorised",
            //   action: "Authorise",
            //   order: {
            //     amount: {
            //       value: 10000,
            //       currency: "EUR",
            //     },
            //   },
            // });
          },
          onPaymentCompleted: (result, component) => {
            console.info("onPaymentCompleted", result, component);
          },
          onPaymentFailed: (result, component) => {
            console.info("onPaymentFailed", result, component);
          },
          onError: (error, component) => {
            console.error(
              "onError",
              error.name,
              error.message,
              error.stack,
              component
            );
          },
        });
        setAdyenCheckout(client);
      } catch (error) {
        onError?.(error as Error);
        setAdyenCheckout(null);
      }
    };
    initAdyenCheckout();
  }, []);

  config.paymentConfiguration.paymentMethods;

  const renderMethod = (
    item: ConsultAdyenPaymentMethodSSD,
    adyenCheckout: Core
  ) => {
    if (item.type === "googlepay") {
      return (
        <AdyenGooglePay
          configuration={item.configuration}
          adyenCheckout={adyenCheckout}
        />
      );
    } else if (item.type === "applepay" && isApplePaySupported) {
      return (
        <AdyenApplePay
          configuration={item.configuration}
          adyenCheckout={adyenCheckout}
        />
      );
    } else if (
      includes(
        ["klarna", "klarna_b2b", "klarna_account", "klarna_paynow"],
        item.type
      )
    ) {
      return <AdyenKlarna type={item.type} adyenCheckout={adyenCheckout} />;
    } else if (includes(["afterpay", "afterpay_default"], item.type)) {
      return <AdyenAfterPay type={item.type} adyenCheckout={adyenCheckout} />;
    } else if (item.type === "afterpay_b2b") {
      return <AdyenAfterPayB2B adyenCheckout={adyenCheckout} />;
    } else if (
      includes(
        [
          "clearpay",
          "ideal",
          "kakaopay",
          "naverpay",
          "paypay",
          "mobilepay",
          "grabpay_SG",
          "alma",
          "ebanking_FI",
        ],
        item.type
      )
    ) {
      return <AdyenRedirect type={item.type} adyenCheckout={adyenCheckout} />;
    } else if (
      includes(
        [
          "econtext_online",
          "econtext_seven_eleven",
          "econtext_atm",
          "econtext_stores",
        ],
        item.type
      )
    ) {
      <AdyenEcontext type={item.type} adyenCheckout={adyenCheckout} />;
    } else if (item.type === "trustly") {
      <AdyenTrustly adyenCheckout={adyenCheckout} />;
    } else if (item.type === "paybybank") {
      <AdyenPayByBank adyenCheckout={adyenCheckout} />;
    } else if (item.type === "paybybank_AIS_DD") {
      <AdyenPayByBankUS adyenCheckout={adyenCheckout} />;
    } else if (item.type === "atome") {
      <AdyenAtome adyenCheckout={adyenCheckout} />;
    } else if (item.type === "onlineBanking") {
      <AdyenDotpay adyenCheckout={adyenCheckout} />;
    } else if (item.type === "onlineBanking_CZ") {
      <AdyenOnlineBankingCZ adyenCheckout={adyenCheckout} />;
    } else if (item.type === "onlinebanking_IN") {
      <AdyenOnlineBankingIN adyenCheckout={adyenCheckout} />;
    } else if (item.type === "onlineBanking_PL") {
      <AdyenOnlineBankingPL adyenCheckout={adyenCheckout} />;
    } else if (item.type === "onlineBanking_SK") {
      <AdyenOnlineBankingSK adyenCheckout={adyenCheckout} />;
    } else if (item.type === "molpay_ebanking_fpx_MY") {
      <AdyenMolPayEBankingMY adyenCheckout={adyenCheckout} />;
    } else if (item.type === "molpay_ebanking_TH") {
      <AdyenMolPayEBankingTH adyenCheckout={adyenCheckout} />;
    }
  };

  return (
    adyenCheckout &&
    config?.paymentConfiguration?.paymentMethods?.map((method) => {
      const component = renderMethod(method, adyenCheckout);
      return component ? (
        <PaymentMethodCard
          key={method.type}
          id={`adyen-${method.type}`}
          title={method.name}
          onSelect={onPaymentMethodSelected}
        >
          {component}
        </PaymentMethodCard>
      ) : null;
    })
  );
};

export default Adyen;
