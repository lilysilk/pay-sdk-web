import type { FC } from "react";
import { Provider } from "jotai";
import Container from "./Container";
import CombinedPayments from "./CombinedPayments";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  return (
    <Container>
      <Provider>
        <CombinedPayments />
      </Provider>
    </Container>
  );
};

export default Main;
