import { useEffect, useState, useContext, type FC } from "react";
import { includes } from "lodash-es";
import {
  AdyenCheckout,
  type Core,
  type SubmitData as AdyenSubmitData,
} from "@adyen/adyen-web";
import "@adyen/adyen-web/styles/adyen.css";
import {
  PSP,
  type ConsultAdyenSSD,
  type ConsultAdyenPaymentMethodSSD,
  type PSPType,
} from "@/types";
import { isApplePaySupported, PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentContext } from "@/components/EnvironmentContext";
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

interface SubmitData {
  pspType: PSPType;
  paymentType: string;
  pspId: string | number;
  external?: Record<string, any>;
}

interface CompleteData {
  pspType: PSPType;
  paymentType: string;
}

interface AdyenProps {
  countryCode: string;
  amount: number;
  currency: string;
  config: ConsultAdyenSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: SubmitData) => Promise<any>;
  onComplete?: (payment: CompleteData) => Promise<any>;
  onError?: (error: PaymentError) => void;
}

const Adyen: FC<AdyenProps> = ({
  countryCode,
  amount,
  currency,
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [adyenCheckout, setAdyenCheckout] = useState<Core | null>(null);
  const { env } = useContext(EnvironmentContext)!;
  const adyenEnv =
    env === "prod" ? config.merchantConfiguration.payEnvironment : "test";

  const handleClick = useMemoizedFn((type: string) => {
    // applepay和googlepay的点击事件 用作埋点？
    console.log("+++++++++++++++++", type);
  });

  useEffect(() => {
    const initAdyenCheckout = async () => {
      try {
        const client = await AdyenCheckout({
          environment: adyenEnv,
          clientKey: config.merchantConfiguration.clientKey,
          // 需要根据storeCode或者当前浏览器语言来确定
          locale: "en-US",
          countryCode,
          amount: {
            value: amount,
            currency: currency,
          },
          onSubmit: async (state, component, actions) => {
            console.log(state, component, actions);
            const response = await handleSubmit(state);
            try {
              const result = JSON.parse(response.data.authMeta.adyenResponse);
              if (!result.resultCode) {
                actions.reject();
                return;
              }

              const { resultCode, action, order, donationToken } = result;

              // If the /payments request request from your server is successful, you must call this to resolve whichever of the listed objects are available.
              // You must call this, even if the result of the payment is unsuccessful.
              actions.resolve({
                resultCode,
                action,
                order,
                donationToken,
              });
            } catch (error) {
              actions.reject();
            }
          },
          onPaymentCompleted: (result, component) => {
            console.info("onPaymentCompleted", result, component);
            handleComplete(component?.data?.paymentMethod?.type);
          },
          onPaymentFailed: (result, component) => {
            console.info("onPaymentFailed", result, component);
          },
          onError: (error, component) => {
            // 用户Cancel就不报错了  error.name为CANCEL
            console.log(error);
            if (error.name === "CANCEL") {
              console.log(
                `Adyen-${component?.data?.paymentMethod?.type}: user cancel`
              );
              return;
            }
            handleError(PaymentError.businessError(error.message));
          },
        });
        setAdyenCheckout(client);
      } catch (error) {
        handleError(PaymentError.initError((error as Error)?.message));
        setAdyenCheckout(null);
      }
    };
    initAdyenCheckout();
  }, [adyenEnv, amount, currency]);

  const handleSubmit = useMemoizedFn(async (state: AdyenSubmitData) => {
    return onSubmit?.({
      pspType: PSP.ADYEN,
      paymentType: state.data.paymentMethod.type,
      pspId: config.id,
      external: {
        ...state.data,
      },
    });
  });

  const handleComplete = useMemoizedFn(async (type: string) => {
    onComplete?.({
      pspType: PSP.ADYEN,
      paymentType: type,
    });
  });

  const handleError = useMemoizedFn((error: PaymentError) => {
    error.meta.pspType = config.type;
    onError?.(error);
  });

  const renderMethod = (
    item: ConsultAdyenPaymentMethodSSD,
    adyenCheckout: Core
  ) => {
    if (item.type === "googlepay") {
      return (
        <AdyenGooglePay
          configuration={item.configuration}
          adyenCheckout={adyenCheckout}
          onClick={handleClick}
        />
      );
    } else if (item.type === "applepay" && isApplePaySupported) {
      return (
        <AdyenApplePay
          configuration={item.configuration}
          adyenCheckout={adyenCheckout}
          onClick={handleClick}
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
          "kcp_naverpay",
          "kcp_payco",
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
