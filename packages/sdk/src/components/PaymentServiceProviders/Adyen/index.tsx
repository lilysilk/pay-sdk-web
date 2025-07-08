import { useRef, type FC } from "react";
import { AdyenCheckout } from "@adyen/adyen-web";
import "@adyen/adyen-web/styles/adyen.css";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface AdyenProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const Adyen: FC<AdyenProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  // const initAdyenPromiseRef = useRef<ReturnType<typeof AdyenCheckout> | null>(
  //   null
  // );
  // if (initAdyenPromiseRef.current === null) {
  //   initAdyenPromiseRef.current = AdyenCheckout({
  //     environment: "test",
  //     clientKey: "test",
  //     locale: "en",
  //     countryCode: "US",
  //     paymentMethodsResponse: {},
  //   });
  // }

  return (
    <div>
      <PaymentMethodCard id="adyen" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Adyen;
