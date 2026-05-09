import { create } from "zustand";

export interface Beneficiary {
  relationship: string;
  dateOfBirth: string;
  firstName: string;
  lastname: string;
  sharePercentage: string;
  isMinor: boolean;
  guardianFirstName: string;
  guardianSurname: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianDateOfBirth: string;
  guardianRelationship: string;
}

export interface LifeInsuranceFormData {
  // Step 1 - Personal Information
  premiumAmount: string;
  premiumFrequency: string;
  gender: string;
  dateOfBirth: string;
  firstName: string;
  lastname: string;
  otherName: string;
  phone: string;
  email: string;
  nin: string;
  state: string;
  city: string;
  address: string;
  // Step 2 - Beneficiaries
  beneficiaries: Beneficiary[];
  // Step 3 - Identity Details
  signatureFile: string;
  photoFile: string;
  identityFile: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  // Medical questions
  medHospitalized: string;
  medRelativeHospitalized: string;
  medConsultedDoctor: string;
  medRelativeConsultedDoctor: string;
  medTakingMedication: string;
  medSufferingFromAbove: string;
  medFamilySuffered: string;
  medChronicAilment: string;
  medSeekingAdvice: string;
  medRefusedBloodDonor: string;
  medInsuranceDeclined: string;
  // Substance use
  useAlcohol: string;
  useTobacco: string;
  useNarcotics: string;
  useHardDrugs: string;
  // Payment
  couponCode: string;
}

export interface LifeInsuranceStore {
  currentStep: number;
  formData: LifeInsuranceFormData;
  setStep: (step: number) => void;
  updateField: (
    field: keyof LifeInsuranceFormData,
    value: string | number
  ) => void;
  updateBeneficiary: (
    index: number,
    field: keyof Beneficiary,
    value: string | boolean
  ) => void;
  addBeneficiary: () => void;
  removeBeneficiary: (index: number) => void;
  reset: () => void;
}

const emptyBeneficiary: Beneficiary = {
  relationship: "",
  dateOfBirth: "",
  firstName: "",
  lastname: "",
  sharePercentage: "",
  isMinor: false,
  guardianFirstName: "",
  guardianSurname: "",
  guardianPhone: "",
  guardianEmail: "",
  guardianDateOfBirth: "",
  guardianRelationship: "",
};

const initialFormData: LifeInsuranceFormData = {
  premiumAmount: "",
  premiumFrequency: "Annually",
  gender: "",
  dateOfBirth: "",
  firstName: "",
  lastname: "",
  otherName: "",
  phone: "",
  email: "",
  nin: "",
  state: "",
  city: "",
  address: "",
  beneficiaries: [{ ...emptyBeneficiary }],
  signatureFile: "",
  photoFile: "",
  identityFile: "",
  bankName: "",
  accountNumber: "",
  accountName: "",
  medHospitalized: "",
  medRelativeHospitalized: "",
  medConsultedDoctor: "",
  medRelativeConsultedDoctor: "",
  medTakingMedication: "",
  medSufferingFromAbove: "",
  medFamilySuffered: "",
  medChronicAilment: "",
  medSeekingAdvice: "",
  medRefusedBloodDonor: "",
  medInsuranceDeclined: "",
  useAlcohol: "",
  useTobacco: "",
  useNarcotics: "",
  useHardDrugs: "",
  couponCode: "",
};

function createLifeInsuranceStore() {
  return create<LifeInsuranceStore>((set) => ({
    currentStep: 1,
    formData: initialFormData,
    setStep: (step) => set({ currentStep: step }),
    updateField: (field, value) =>
      set((state) => ({
        formData: { ...state.formData, [field]: value },
      })),
    updateBeneficiary: (index, field, value) =>
      set((state) => ({
        formData: {
          ...state.formData,
          beneficiaries: state.formData.beneficiaries.map((b, i) =>
            i === index ? { ...b, [field]: value } : b
          ),
        },
      })),
    addBeneficiary: () =>
      set((state) => ({
        formData: {
          ...state.formData,
          beneficiaries: [
            ...state.formData.beneficiaries,
            { ...emptyBeneficiary },
          ],
        },
      })),
    removeBeneficiary: (index) =>
      set((state) => ({
        formData: {
          ...state.formData,
          beneficiaries:
            state.formData.beneficiaries.length > 1
              ? state.formData.beneficiaries.filter((_, i) => i !== index)
              : state.formData.beneficiaries,
        },
      })),
    reset: () => set({ currentStep: 1, formData: initialFormData }),
  }));
}

// One isolated store per plan so flows do not share state.
export const useTermLifePlanStore = createLifeInsuranceStore();
export const useFamilyBenefitsPlanStore = createLifeInsuranceStore();
export const usePersonalAccidentInsuranceStore = createLifeInsuranceStore();
export const useLifestyleProtectionInsuranceStore = createLifeInsuranceStore();
