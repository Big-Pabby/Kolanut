import { create } from 'zustand';

export type PolicyholderType = 'private' | 'corporate' | '';
export type InsuranceType = 'building-only' | 'content-only' | 'building-and-content' | '';

export interface ContentItem {
  id: string;
  type: string;
  value: string;
  description: string;
}

export interface HomeInsuranceFormData {
  policyholderType: PolicyholderType;
  insuranceType: InsuranceType;
  // Private person fields
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nin: string;
  // Corporate fields
  companyName: string;
  companyNin: string;
  companyEmail: string;
  companyPhone: string;
  // Building info
  buildingDescription: string;
  buildingValue: string;
  buildingRiskLocation: string;
  // Content info
  contentItems: ContentItem[];
  contentRiskLocation: string;
  // Payment
  couponCode: string;
}

interface HomeInsuranceStore {
  currentStep: number;
  formData: HomeInsuranceFormData;
  setStep: (step: number) => void;
  updateField: <K extends keyof HomeInsuranceFormData>(field: K, value: HomeInsuranceFormData[K]) => void;
  addContentItem: () => void;
  removeContentItem: (id: string) => void;
  updateContentItem: (id: string, field: keyof Omit<ContentItem, 'id'>, value: string) => void;
  reset: () => void;
}

const initialFormData: HomeInsuranceFormData = {
  policyholderType: '',
  insuranceType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nin: '',
  companyName: '',
  companyNin: '',
  companyEmail: '',
  companyPhone: '',
  buildingDescription: '',
  buildingValue: '',
  buildingRiskLocation: '',
  contentItems: [{ id: '1', type: '', value: '', description: '' }],
  contentRiskLocation: '',
  couponCode: '',
};

export const useHomeInsuranceStore = create<HomeInsuranceStore>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  setStep: (step) => set({ currentStep: step }),
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  addContentItem: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        contentItems: [
          ...state.formData.contentItems,
          { id: Date.now().toString(), type: '', value: '', description: '' },
        ],
      },
    })),
  removeContentItem: (id) =>
    set((state) => ({
      formData: {
        ...state.formData,
        contentItems: state.formData.contentItems.filter((item) => item.id !== id),
      },
    })),
  updateContentItem: (id, field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        contentItems: state.formData.contentItems.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    })),
  reset: () => set({ currentStep: 1, formData: initialFormData }),
}));
