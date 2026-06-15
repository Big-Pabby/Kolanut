import { create } from "zustand";

export interface CouponGeneratorData {
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
}

interface CouponFlowStore {
  /** True when the user reached an insurance flow via the coupon generation page. */
  isCouponFlow: boolean;
  generator: CouponGeneratorData;
  startCouponFlow: () => void;
  updateGenerator: (field: keyof CouponGeneratorData, value: string) => void;
  reset: () => void;
}

const initialGenerator: CouponGeneratorData = {
  firstName: "",
  lastname: "",
  email: "",
  phone: "",
};

export const useCouponFlowStore = create<CouponFlowStore>((set) => ({
  isCouponFlow: false,
  generator: initialGenerator,
  startCouponFlow: () => set({ isCouponFlow: true }),
  updateGenerator: (field, value) =>
    set((state) => ({
      generator: { ...state.generator, [field]: value },
    })),
  reset: () => set({ isCouponFlow: false, generator: initialGenerator }),
}));
