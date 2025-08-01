import { atom, type Atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { values, every, size } from "lodash-es";

const LAST_SELECTED_PAYMENT_METHOD_KEY =
  "___LILYSILK_PAY_SDK_WEB_LAST_SELECTED_PAYMENT_METHOD___";

const accordionIsSelecteWithIdMap = new Map<string, Atom<boolean>>();

export const paymentMethodAtom = atomWithStorage<string | null>(
  LAST_SELECTED_PAYMENT_METHOD_KEY,
  null
);

export const getAccordionIsSelectedAtom = (id: string) => {
  if (!accordionIsSelecteWithIdMap.has(id)) {
    const isSelectedAtom = atom<boolean>((get) => {
      const paymentMethod = get(paymentMethodAtom);
      return paymentMethod === id;
    });
    accordionIsSelecteWithIdMap.set(id, isSelectedAtom);
  }
  return accordionIsSelecteWithIdMap.get(id)!;
};

export const combinedPaymentsRenderStatesAtom = atom<{
  total: number;
  loadError: Record<string, true>;
}>({
  total: 0,
  loadError: {},
});

export const combinedPaymentsRenderAllFailedAtom = atom<boolean>((get) => {
  const renderStates = get(combinedPaymentsRenderStatesAtom);

  return (
    renderStates.total > 0 &&
    renderStates.total === size(renderStates.loadError)
  );
});
