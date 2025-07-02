import type { FC } from "react";
import { Provider } from "jotai";
import CombinedPayments from "./CombinedPayments";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  return (
    <div>
      <Provider>
        <CombinedPayments />
      </Provider>
    </div>
  );
};

export default Main;
