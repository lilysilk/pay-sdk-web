import type { FC } from "react";
import CombinedPayments from "./CombinedPayments";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  return (
    <div>
      <CombinedPayments />
    </div>
  );
};

export default Main;
