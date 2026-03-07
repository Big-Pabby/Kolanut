import { create } from 'zustand';

export type PolicyholderType = 'private' | 'corporate' | '';
export type OccupationCategory =
  | 'importer'
  | 'exporter'
  | 'freight-forwarder'
  | 'manufacturer'
  | 'distributor'
  | 'retailer'
  | 'other'
  | '';

export interface GoodsItem {
  id: string;
  type: string;
  value: string;
}

export interface MarineInsuranceFormData {
  // Policy Type
  policyholderType: PolicyholderType;
  occupationCategory: OccupationCategory;

  // Private person fields
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nin: string;
  address: string;
  state: string;
  city: string;
  country: string;

  // Corporate fields
  companyName: string;
  companyNin: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyState: string;
  companyCity: string;
  companyCountry: string;

  // Occupation-specific
  occupationLicenseNo: string;

  // Cargo info
  startDate: string;
  portOfOrigin: string;
  portOfDischarge: string;
  charterType: string;
  conditions: string;

  // Goods (dynamic list)
  goodsItems: GoodsItem[];

  // Finance info
  exchangeRate: string;
  currency: string;
  insuredValue: string;
  premium: string;
  pfiDate: string;
  tin: string;
  marksNumbers: string;
  interest: string;
  pfiNo: string;
  bankLien: string;
  mediumOfConveyance: string;
  excess: string;

  // Documents (stored as file names for display)
  pfiDocumentName: string;
  meansOfIdName: string;
  cacDocumentName: string;

  // Examine
  examineName: string;

  // Payment
  couponCode: string;
}

interface MarineInsuranceStore {
  currentStep: number;
  formData: MarineInsuranceFormData;
  setStep: (step: number) => void;
  updateField: <K extends keyof MarineInsuranceFormData>(
    field: K,
    value: MarineInsuranceFormData[K],
  ) => void;
  addGoodsItem: () => void;
  removeGoodsItem: (id: string) => void;
  updateGoodsItem: (id: string, field: keyof Omit<GoodsItem, 'id'>, value: string) => void;
  reset: () => void;
}

const initialFormData: MarineInsuranceFormData = {
  policyholderType: '',
  occupationCategory: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nin: '',
  address: '',
  state: '',
  city: '',
  country: 'Nigeria',
  companyName: '',
  companyNin: '',
  companyEmail: '',
  companyPhone: '',
  companyAddress: '',
  companyState: '',
  companyCity: '',
  companyCountry: 'Nigeria',
  occupationLicenseNo: '',
  startDate: '',
  portOfOrigin: '',
  portOfDischarge: '',
  charterType: '',
  conditions: '',
  goodsItems: [{ id: '1', type: '', value: '' }],
  exchangeRate: '',
  currency: '',
  insuredValue: '',
  premium: '',
  pfiDate: '',
  tin: '',
  marksNumbers: '',
  interest: '',
  pfiNo: '',
  bankLien: '',
  mediumOfConveyance: '',
  excess: '',
  pfiDocumentName: '',
  meansOfIdName: '',
  cacDocumentName: '',
  examineName: '',
  couponCode: '',
};

export const useMarineInsuranceStore = create<MarineInsuranceStore>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  setStep: (step) => set({ currentStep: step }),
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  addGoodsItem: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        goodsItems: [
          ...state.formData.goodsItems,
          { id: Date.now().toString(), type: '', value: '' },
        ],
      },
    })),
  removeGoodsItem: (id) =>
    set((state) => ({
      formData: {
        ...state.formData,
        goodsItems: state.formData.goodsItems.filter((item) => item.id !== id),
      },
    })),
  updateGoodsItem: (id, field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        goodsItems: state.formData.goodsItems.map((item) =>
          item.id === id ? { ...item, [field]: value } : item,
        ),
      },
    })),
  reset: () => set({ currentStep: 1, formData: initialFormData }),
}));
