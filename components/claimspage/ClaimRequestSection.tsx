// "use client";

// import { useState, type FormEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
// import DocumentDropzone from "./DocumentDropzone";
// import ImageUploadTile from "./ImageUploadTile";

// interface ClaimFormValues {
//   policyNumber: string;
//   incidentType: string;
//   dateOfIncident: string;
//   timeOfIncident: string;
//   locationOfIncident: string;
//   circumstance: string;
// }

// const INITIAL_VALUES: ClaimFormValues = {
//   policyNumber: "",
//   incidentType: "",
//   dateOfIncident: "",
//   timeOfIncident: "",
//   locationOfIncident: "",
//   circumstance: "",
// };

// export default function ClaimRequestSection() {
//   const [values, setValues] = useState<ClaimFormValues>(INITIAL_VALUES);
//   const [supportingDocument, setSupportingDocument] = useState<File | null>(
//     null,
//   );
//   const [imageEvidence, setImageEvidence] = useState<(File | null)[]>([
//     null,
//     null,
//     null,
//     null,
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const updateField =
//     (field: keyof ClaimFormValues) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//       setValues((prev) => ({ ...prev, [field]: e.target.value }));

//   const updateImageEvidence = (index: number, file: File | null) => {
//     setImageEvidence((prev) => {
//       const next = [...prev];
//       next[index] = file;
//       return next;
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       Object.entries(values).forEach(([key, value]) =>
//         formData.append(key, value),
//       );
//       if (supportingDocument) {
//         formData.append("supportingDocument", supportingDocument);
//       }
//       imageEvidence.forEach((file, i) => {
//         if (file) formData.append(`imageEvidence[${i}]`, file);
//       });

//       // Wire this up to your claims-submission endpoint.
//       await fetch("/api/claims/submit", {
//         method: "POST",
//         body: formData,
//       });

//       setValues(INITIAL_VALUES);
//       setSupportingDocument(null);
//       setImageEvidence([null, null, null, null]);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="max-w-[1440px] bg-gradient-to-br from-brand-red to-[#5c0308] ">
//       <div className=" p-8 md:p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
//           {/* Claim request form */}
//           <div className="rounded-2xl bg-white p-6 md:p-8">
//             <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
//               Make a claim request
//             </h2>
//             <p className="font-body! mt-1 text-sm text-body-text">
//               Please answer the following questions so we can help process your
//               claim.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Field label="Policy Number">
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g KA-123500912"
//                     value={values.policyNumber}
//                     onChange={updateField("policyNumber")}
//                     className={inputClasses}
//                   />
//                 </Field>
//                 <Field label="Incident type">
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g Theft, Fire, Accident"
//                     value={values.incidentType}
//                     onChange={updateField("incidentType")}
//                     className={inputClasses}
//                   />
//                 </Field>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Field label="Date of Incident">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       placeholder="e.g 12/05/2026"
//                       value={values.dateOfIncident}
//                       onChange={updateField("dateOfIncident")}
//                       className={`${inputClasses} pr-9`}
//                     />
//                     <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text" />
//                   </div>
//                 </Field>
//                 <Field label="Time of incident">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       required
//                       placeholder="e.g 9:00 AM"
//                       value={values.timeOfIncident}
//                       onChange={updateField("timeOfIncident")}
//                       className={`${inputClasses} pr-9`}
//                     />
//                     <Clock className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text" />
//                   </div>
//                 </Field>
//               </div>

//               <Field label="Location of Incident">
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g Ikeja, Lagos, Nigeria"
//                   value={values.locationOfIncident}
//                   onChange={updateField("locationOfIncident")}
//                   className={inputClasses}
//                 />
//               </Field>

//               <Field label="Describe the full circumstance of the incident">
//                 <textarea
//                   required
//                   rows={4}
//                   placeholder="Tell us about the incident."
//                   value={values.circumstance}
//                   onChange={updateField("circumstance")}
//                   className={`${inputClasses} resize-none`}
//                 />
//               </Field>

//               <DocumentDropzone
//                 label="Upload supporting documents (e.g police report)"
//                 file={supportingDocument}
//                 onFileSelect={setSupportingDocument}
//               />

//               <div>
//                 <p className="font-body! text-xs font-medium text-dark-text mb-1.5">
//                   Upload supporting image evidences
//                 </p>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {imageEvidence.map((file, i) => (
//                     <ImageUploadTile
//                       key={i}
//                       file={file}
//                       onFileSelect={(f) => updateImageEvidence(i, f)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="font-body! mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 hover:bg-brand-red/90 disabled:opacity-60"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </Button>
//             </form>
//           </div>

//           {/* Get in touch */}
//           <div className="rounded-2xl bg-white p-6 md:p-8 h-fit">
//             <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
//               Get in Touch
//             </h2>
//             <p className="font-body! mt-1 text-sm text-body-text">
//               Multiple ways to reach our team
//             </p>

//             <div className="mt-6 flex flex-col gap-5">
//               <ContactRow icon={Phone} label="Phone and whatsapp">
//                 +234 911 600 0658
//               </ContactRow>
//               <ContactRow icon={Mail} label="Email">
//                 support@kolanutafrica.com
//               </ContactRow>
//               <ContactRow icon={MapPin} label="Office Address">
//                 28, Daniyan Nataila Street, Lekki Phase 1, Lagos, Nigeria
//                 <br />
//                 Visit us Monday to Friday, 9AM – 5PM
//               </ContactRow>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// const inputClasses =
//   "font-body! w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-dark-text placeholder:text-body-text/60 focus:outline-none focus:ring-2 focus:ring-brand-red/40";

// function Field({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <label className="flex flex-col gap-1.5">
//       <span className="font-body! text-xs font-medium text-dark-text">
//         {label}
//       </span>
//       {children}
//     </label>
//   );
// }

// function ContactRow({
//   icon: Icon,
//   label,
//   children,
// }: {
//   icon: typeof Phone;
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-start gap-3">
//       <span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-red/10 shrink-0 text-brand-red">
//         <Icon className="w-4 h-4" />
//       </span>
//       <div className="font-body! text-sm">
//         <p className="font-body! text-body-text">{label}</p>
//         <p className="font-body! font-medium text-dark-text">{children}</p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useRef, type FormEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
// import DocumentDropzone from "./DocumentDropzone";
// import ImageUploadTile from "./ImageUploadTile";

// interface ClaimFormValues {
//   policyNumber: string;
//   incidentType: string;
//   dateOfIncident: string;
//   timeOfIncident: string;
//   locationOfIncident: string;
//   circumstance: string;
// }

// const INITIAL_VALUES: ClaimFormValues = {
//   policyNumber: "",
//   incidentType: "",
//   dateOfIncident: "",
//   timeOfIncident: "",
//   locationOfIncident: "",
//   circumstance: "",
// };

// export default function ClaimRequestSection() {
//   const [values, setValues] = useState<ClaimFormValues>(INITIAL_VALUES);
//   const [supportingDocument, setSupportingDocument] = useState<File | null>(
//     null,
//   );
//   const [imageEvidence, setImageEvidence] = useState<(File | null)[]>([
//     null,
//     null,
//     null,
//     null,
//   ]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const dateInputRef = useRef<HTMLInputElement | null>(null);
//   const timeInputRef = useRef<HTMLInputElement | null>(null);

//   const updateField =
//     (field: keyof ClaimFormValues) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//       setValues((prev) => ({ ...prev, [field]: e.target.value }));

//   const updateImageEvidence = (index: number, file: File | null) => {
//     setImageEvidence((prev) => {
//       const next = [...prev];
//       next[index] = file;
//       return next;
//     });
//   };

//   const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
//     const el = ref.current;
//     if (!el) return;
//     // showPicker is supported in modern Chromium/Edge/Firefox; fall back to focus for others.
//     if (typeof el.showPicker === "function") {
//       el.showPicker();
//     } else {
//       el.focus();
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       Object.entries(values).forEach(([key, value]) =>
//         formData.append(key, value),
//       );
//       if (supportingDocument) {
//         formData.append("supportingDocument", supportingDocument);
//       }
//       imageEvidence.forEach((file, i) => {
//         if (file) formData.append(`imageEvidence[${i}]`, file);
//       });

//       // Wire this up to your claims-submission endpoint.
//       await fetch("/api/claims/submit", {
//         method: "POST",
//         body: formData,
//       });

//       setValues(INITIAL_VALUES);
//       setSupportingDocument(null);
//       setImageEvidence([null, null, null, null]);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="mx-auto max-w-[1440px] bg-gradient-to-br from-brand-red to-[#5c0308] ">
//       <div className=" p-8 md:p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-stretch">
//           {/* Claim request form */}
//           <div className="rounded-2xl bg-white p-6 md:p-8">
//             <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
//               Make a claim request
//             </h2>
//             <p className="font-body! mt-1 text-sm text-body-text">
//               Please answer the following questions so we can help process your
//               claim.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Field label="Policy Number">
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g KA-123500912"
//                     value={values.policyNumber}
//                     onChange={updateField("policyNumber")}
//                     className={inputClasses}
//                   />
//                 </Field>
//                 <Field label="Incident type">
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g Theft, Fire, Accident"
//                     value={values.incidentType}
//                     onChange={updateField("incidentType")}
//                     className={inputClasses}
//                   />
//                 </Field>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Field label="Date of Incident">
//                   <div className="relative">
//                     <input
//                       ref={dateInputRef}
//                       type="date"
//                       required
//                       value={values.dateOfIncident}
//                       onChange={updateField("dateOfIncident")}
//                       onClick={() => openPicker(dateInputRef)}
//                       max={new Date().toISOString().split("T")[0]}
//                       className={`${inputClasses} pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
//                     />
//                     <Calendar
//                       onClick={() => openPicker(dateInputRef)}
//                       className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text"
//                     />
//                   </div>
//                 </Field>
//                 <Field label="Time of incident">
//                   <div className="relative">
//                     <input
//                       ref={timeInputRef}
//                       type="time"
//                       required
//                       value={values.timeOfIncident}
//                       onChange={updateField("timeOfIncident")}
//                       onClick={() => openPicker(timeInputRef)}
//                       className={`${inputClasses} pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
//                     />
//                     <Clock
//                       onClick={() => openPicker(timeInputRef)}
//                       className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text"
//                     />
//                   </div>
//                 </Field>
//               </div>

//               <Field label="Location of Incident">
//                 <input
//                   type="text"
//                   required
//                   placeholder="e.g Ikeja, Lagos, Nigeria"
//                   value={values.locationOfIncident}
//                   onChange={updateField("locationOfIncident")}
//                   className={inputClasses}
//                 />
//               </Field>

//               <Field label="Describe the full circumstance of the incident">
//                 <textarea
//                   required
//                   rows={4}
//                   placeholder="Tell us about the incident."
//                   value={values.circumstance}
//                   onChange={updateField("circumstance")}
//                   className={`${inputClasses} resize-none`}
//                 />
//               </Field>

//               <DocumentDropzone
//                 label="Upload supporting documents (e.g police report)"
//                 file={supportingDocument}
//                 onFileSelect={setSupportingDocument}
//               />

//               <div>
//                 <p className="font-body! text-xs font-medium text-dark-text mb-1.5">
//                   Upload supporting image evidences
//                 </p>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {imageEvidence.map((file, i) => (
//                     <ImageUploadTile
//                       key={i}
//                       file={file}
//                       onFileSelect={(f) => updateImageEvidence(i, f)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="font-body! mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-6 hover:bg-brand-red/90 disabled:opacity-60"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </Button>
//             </form>
//           </div>

//           {/* Get in touch */}
//           <div className="rounded-2xl bg-white p-6 md:p-8 h-fit">
//             <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
//               Get in Touch
//             </h2>
//             <p className="font-body! mt-1 text-sm text-body-text">
//               Multiple ways to reach our team
//             </p>

//             <div className="mt-6 flex flex-col gap-5">
//               <ContactRow icon={Phone} label="Phone and whatsapp">
//                 +234 911 600 0658
//               </ContactRow>
//               <ContactRow icon={Mail} label="Email">
//                 support@kolanutafrica.com
//               </ContactRow>
//               <ContactRow icon={MapPin} label="Office Address">
//                 28, Daniyan Nataila Street, Lekki Phase 1, Lagos, Nigeria
//                 <br />
//                 Visit us Monday to Friday, 9AM – 5PM
//               </ContactRow>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// const inputClasses =
//   "font-body! w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-dark-text placeholder:text-body-text/60 focus:outline-none focus:ring-2 focus:ring-brand-red/40";

// function Field({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <label className="flex flex-col gap-1.5">
//       <span className="font-body! text-xs font-medium text-dark-text">
//         {label}
//       </span>
//       {children}
//     </label>
//   );
// }

// function ContactRow({
//   icon: Icon,
//   label,
//   children,
// }: {
//   icon: typeof Phone;
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-start gap-3">
//       <span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-red/10 shrink-0 text-brand-red">
//         <Icon className="w-4 h-4" />
//       </span>
//       <div className="font-body! text-sm">
//         <p className="font-body! text-body-text">{label}</p>
//         <p className="font-body! font-medium text-dark-text">{children}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
import DocumentDropzone from "./DocumentDropzone";
import ImageUploadTile from "./ImageUploadTile";

interface ClaimFormValues {
  policyNumber: string;
  incidentType: string;
  dateOfIncident: string;
  timeOfIncident: string;
  locationOfIncident: string;
  circumstance: string;
}

const INITIAL_VALUES: ClaimFormValues = {
  policyNumber: "",
  incidentType: "",
  dateOfIncident: "",
  timeOfIncident: "",
  locationOfIncident: "",
  circumstance: "",
};

export default function ClaimRequestSection() {
  const router = useRouter();
  const [values, setValues] = useState<ClaimFormValues>(INITIAL_VALUES);
  const [supportingDocument, setSupportingDocument] = useState<File | null>(
    null,
  );
  const [imageEvidence, setImageEvidence] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const timeInputRef = useRef<HTMLInputElement | null>(null);

  const updateField =
    (field: keyof ClaimFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const updateImageEvidence = (index: number, file: File | null) => {
    setImageEvidence((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current;
    if (!el) return;
    // showPicker is supported in modern Chromium/Edge/Firefox; fall back to focus for others.
    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      el.focus();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value),
      );
      if (supportingDocument) {
        formData.append("supportingDocument", supportingDocument);
      }
      imageEvidence.forEach((file, i) => {
        if (file) formData.append(`imageEvidence[${i}]`, file);
      });

      // Wire this up to your claims-submission endpoint.
      await fetch("/api/claims/submit", {
        method: "POST",
        body: formData,
      });

      setValues(INITIAL_VALUES);
      setSupportingDocument(null);
      setImageEvidence([null, null, null, null]);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    setShowSuccess(false);
    router.push("/");
  };

  return (
    <section className="max-w-[1440px] mx-auto bg-gradient-to-br from-brand-red to-[#5c0308] ">
      <div className=" p-8 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-stretch">
          {/* Claim request form */}
          <div className="rounded-2xl bg-white p-6 md:p-8">
            <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
              Make a claim request
            </h2>
            <p className="font-body! mt-1 text-sm text-body-text">
              Please answer the following questions so we can help process your
              claim.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Policy Number">
                  <input
                    type="text"
                    required
                    placeholder="e.g KA-123500912"
                    value={values.policyNumber}
                    onChange={updateField("policyNumber")}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Incident type">
                  <input
                    type="text"
                    required
                    placeholder="e.g Theft, Fire, Accident"
                    value={values.incidentType}
                    onChange={updateField("incidentType")}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Date of Incident">
                  <div className="relative">
                    <input
                      ref={dateInputRef}
                      type="date"
                      required
                      value={values.dateOfIncident}
                      onChange={updateField("dateOfIncident")}
                      onClick={() => openPicker(dateInputRef)}
                      max={new Date().toISOString().split("T")[0]}
                      className={`${inputClasses} pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                    />
                    <Calendar
                      onClick={() => openPicker(dateInputRef)}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text"
                    />
                  </div>
                </Field>
                <Field label="Time of incident">
                  <div className="relative">
                    <input
                      ref={timeInputRef}
                      type="time"
                      required
                      value={values.timeOfIncident}
                      onChange={updateField("timeOfIncident")}
                      onClick={() => openPicker(timeInputRef)}
                      className={`${inputClasses} pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                    />
                    <Clock
                      onClick={() => openPicker(timeInputRef)}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Location of Incident">
                <input
                  type="text"
                  required
                  placeholder="e.g Ikeja, Lagos, Nigeria"
                  value={values.locationOfIncident}
                  onChange={updateField("locationOfIncident")}
                  className={inputClasses}
                />
              </Field>

              <Field label="Describe the full circumstance of the incident">
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the incident."
                  value={values.circumstance}
                  onChange={updateField("circumstance")}
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              <DocumentDropzone
                label="Upload supporting documents (e.g police report)"
                file={supportingDocument}
                onFileSelect={setSupportingDocument}
              />

              <div>
                <p className="font-body! text-xs font-medium text-dark-text mb-1.5">
                  Upload supporting image evidences
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {imageEvidence.map((file, i) => (
                    <ImageUploadTile
                      key={i}
                      file={file}
                      onFileSelect={(f) => updateImageEvidence(i, f)}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="font-body! mt-2 w-full rounded-full bg-brand-red text-white text-sm font-medium !py-3 hover:bg-brand-red/90 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>

          {/* Get in touch */}
          <div className="rounded-2xl bg-white p-6 md:p-8 h-full">
            <h2 className="font-heading! text-xl md:text-2xl font-semibold text-dark-text">
              Get in Touch
            </h2>
            <p className="font-body! mt-1 text-sm text-body-text">
              Multiple ways to reach our team
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <ContactRow icon={Phone} label="Phone and whatsapp">
                +234 911 600 0658
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                support@kolanutafrica.com
              </ContactRow>
              <ContactRow icon={MapPin} label="Office Address">
                28, Daniyan Nataila Street, Lekki Phase 1, Lagos, Nigeria
                <br />
                Visit us Monday to Friday, 9AM – 5PM
              </ContactRow>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          onBackToHome={handleBackToHome}
          onGotIt={() => setShowSuccess(false)}
        />
      )}
    </section>
  );
}

function SuccessModal({
  onBackToHome,
  onGotIt,
}: {
  onBackToHome: () => void;
  onGotIt: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-success-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="relative mx-auto mb-2 flex items-center justify-center">
          {/* Decorative confetti */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="275"
            height="175"
            viewBox="0 0 275 175"
            fill="none"
          >
            <path
              d="M80.7822 86.7644L81.194 96.692L88.8341 93.3523L80.7822 86.7644Z"
              fill="#FEF2F2"
            />
            <path
              d="M71.7238 93.0931C86.2774 93.0931 98.0755 81.295 98.0755 66.7414C98.0755 52.1877 86.2774 40.3896 71.7238 40.3896C57.1701 40.3896 45.3721 52.1877 45.3721 66.7414C45.3721 81.295 57.1701 93.0931 71.7238 93.0931Z"
              fill="#FEF2F2"
            />
            <path
              d="M64.0838 134.359C77.2309 134.359 87.8888 123.701 87.8888 110.554C87.8888 97.4071 77.2309 86.7493 64.0838 86.7493C50.9367 86.7493 40.2788 97.4071 40.2788 110.554C40.2788 123.701 50.9367 134.359 64.0838 134.359Z"
              fill="#FEF2F2"
            />
            <path
              d="M104.954 175C104.725 175 104.496 174.893 104.344 174.68L74.6827 131.477C74.454 131.141 74.5455 130.684 74.8657 130.455C75.2012 130.226 75.6587 130.318 75.8875 130.638L105.548 173.841C105.777 174.176 105.686 174.634 105.365 174.863C105.243 174.954 105.091 175 104.954 175Z"
              fill="#FEF2F2"
            />
            <path
              d="M110.809 173.536C110.504 173.536 110.214 173.338 110.123 173.033L81.926 89.555C81.804 89.1738 82.0023 88.762 82.3835 88.6248C82.7647 88.4875 83.1765 88.701 83.3137 89.0823L111.511 172.56C111.633 172.941 111.434 173.353 111.053 173.49C110.962 173.521 110.885 173.536 110.809 173.536Z"
              fill="#FEF2F2"
            />
            <path
              d="M74.042 128.656L74.713 137.119L82.2769 132.743L74.042 128.656Z"
              fill="#FEF2F2"
            />
            <path
              d="M49.6577 120.085C49.49 120.085 49.3375 120.024 49.2002 119.917C44.915 116.41 45.6013 108.968 45.647 108.663C45.6928 108.267 46.0435 107.977 46.4553 108.007C46.8518 108.053 47.1568 108.404 47.111 108.816C47.111 108.892 46.4705 115.785 50.1457 118.789C50.466 119.048 50.5117 119.506 50.2525 119.826C50.0847 119.994 49.8712 120.085 49.6577 120.085Z"
              fill="white"
            />
            <path
              d="M140.471 112.399C140.394 112.399 140.333 112.384 140.257 112.369C139.19 112.049 138.198 111.744 137.283 111.484C126.548 108.282 126.014 107.779 118.206 93.5201C113.067 84.111 102.514 61.648 94.0349 43.5922C88.484 31.7888 83.7108 21.5867 82.3688 19.2077C80.8743 16.5542 79.8678 16.2492 79.6391 16.3712C79.2273 16.5542 78.8461 18.0487 79.5933 20.0922C81.0726 24.1334 82.5518 27.8696 82.567 27.9153C82.7043 28.2508 82.5823 28.6168 82.2773 28.7998C81.9723 28.9828 81.591 28.9371 81.347 28.6778C79.2121 26.3294 77.0771 23.7979 75.2014 21.5562C71.9379 17.6522 67.8509 12.8027 66.7377 13.0467C66.7072 13.0467 66.6157 13.1535 66.5395 13.4432C66.3565 14.1295 67.7747 16.0967 69.4369 18.3842C70.9009 20.3972 72.7156 22.9134 74.6676 26.1159C74.8506 26.4209 74.7896 26.8326 74.5151 27.0613C74.2406 27.2901 73.8289 27.2901 73.5544 27.0308C73.3714 26.8631 73.0359 26.4514 72.2734 25.5211C65.289 16.9812 62.8642 15.5325 62.056 15.7917C61.9035 15.8375 61.7358 16.234 61.7053 16.9812C61.69 17.3777 61.3393 17.7132 60.9428 17.6827C60.531 17.6674 60.226 17.332 60.2413 16.9202C60.287 15.5172 60.7445 14.6785 61.5833 14.3887C62.8032 13.977 64.5417 15.014 66.7377 17.1032C65.4567 15.258 64.8315 14.038 65.1212 13.0162C65.3957 12.0098 65.9752 11.6743 66.4175 11.5828C68.3237 11.171 71.1297 14.3887 76.3146 20.5802C77.4278 21.9069 78.5411 23.2489 79.7001 24.5909C79.2426 23.3861 78.7241 21.9984 78.1903 20.5649C77.2753 18.0334 77.6108 15.6392 78.9986 14.9987C79.7916 14.6327 81.4538 14.6022 83.6193 18.4604C84.9918 20.8852 89.5515 30.6146 95.3312 42.9364C103.795 60.977 114.332 83.4095 119.456 92.7729C127.203 106.925 127.402 106.986 137.665 110.036C138.58 110.31 139.571 110.6 140.638 110.935C141.02 111.057 141.248 111.469 141.126 111.85C141.065 112.186 140.776 112.399 140.471 112.399Z"
              fill="#AF060D"
            />
            <path
              d="M71.6786 29.852C71.4651 29.852 71.2669 29.7605 71.1144 29.5927C71.0686 29.547 67.1189 24.7738 64.5417 21.9678C60.653 17.7131 59.494 18.0181 59.4787 18.0181C59.4787 18.0181 59.1737 18.3079 59.4482 19.8328C59.5245 20.2293 59.2652 20.6106 58.8687 20.6868C58.4722 20.7631 58.091 20.5038 58.0147 20.1073C57.8927 19.4364 57.4962 17.3624 58.823 16.7066C59.311 16.4626 60.8207 15.7154 65.6244 20.9766C68.2169 23.8131 72.1971 28.6015 72.2428 28.6625C72.5021 28.9675 72.4563 29.4402 72.1513 29.6995C72.0141 29.791 71.8463 29.852 71.6786 29.852Z"
              fill="#AF060D"
            />
            <path
              d="M117.352 173.414C116.971 173.414 116.65 173.109 116.62 172.728L113.646 126.963C111.069 122.007 101.568 102.502 92.3878 83.623C84.9611 68.3732 77.9462 53.9773 76.0095 50.1801C71.7243 41.808 63.2454 30.8891 60.6071 27.7324L59.9056 26.8936C57.7554 24.3317 56.4439 22.7762 56.6574 21.4342C56.7184 21.0834 56.9014 20.6107 57.4809 20.2295C59.7684 18.796 63.9316 23.5082 68.3388 28.8914C69.025 29.7148 69.7265 30.5688 69.9858 30.8281C70.123 30.8891 70.245 30.9958 70.3213 31.1331C70.5348 31.4838 70.4128 31.9261 70.062 32.1396C69.4215 32.5208 69.2538 32.3226 67.2103 29.8368C62.1931 23.7217 59.1736 20.9157 58.2587 21.4952C58.1062 21.5867 58.1062 21.6477 58.0909 21.6782C57.9842 22.3492 59.5244 24.1944 61.0189 25.9634L61.7204 26.8174C64.3891 30.0198 72.9595 41.0607 77.3057 49.5396C79.2424 53.3369 86.2726 67.748 93.6993 83.013C102.544 101.176 112.563 121.763 115.019 126.46C115.064 126.551 115.095 126.643 115.095 126.75L118.084 172.667C118.114 173.063 117.809 173.414 117.398 173.445C117.382 173.414 117.367 173.414 117.352 173.414ZM69.3605 30.8281C69.3453 30.8281 69.33 30.8433 69.3148 30.8433C69.3453 30.8433 69.3605 30.8281 69.3605 30.8281Z"
              fill="#AF060D"
            />
            <path
              d="M79.7611 36.6383C79.4256 36.6383 79.1206 36.3943 79.0444 36.0588C78.1142 31.5296 81.1946 27.8697 81.3166 27.7172C81.5759 27.4122 82.0334 27.3817 82.3536 27.6409C82.6586 27.9002 82.7044 28.3729 82.4299 28.6779C82.3994 28.7084 79.6849 31.9566 80.4779 35.7691C80.5541 36.1656 80.3101 36.5468 79.9136 36.6383C79.8679 36.6231 79.8221 36.6383 79.7611 36.6383Z"
              fill="#AF060D"
            />
            <path
              d="M101.294 100.306C100.943 100.306 100.623 100.047 100.577 99.6963C100.516 99.2999 100.79 98.9186 101.187 98.8576C110.215 97.4089 115.049 89.7687 115.628 88.32C115.781 87.9387 116.208 87.7557 116.574 87.9082C116.955 88.0607 117.138 88.4877 116.986 88.8537C115.964 91.4004 110.382 98.8576 101.416 100.291C101.37 100.306 101.324 100.306 101.294 100.306Z"
              fill="#AF060D"
            />
            <path
              d="M155.11 113.131C154.79 113.131 154.5 112.933 154.409 112.613C154.287 112.232 154.516 111.82 154.897 111.698L156.925 111.088C168.225 107.672 169.156 107.398 177.131 92.8034C182.255 83.4553 192.793 61.0075 201.256 42.9822C207.036 30.6604 211.611 20.931 212.984 18.5062C215.149 14.648 216.811 14.6785 217.604 15.0445C218.992 15.685 219.343 18.064 218.412 20.6107C217.894 22.0442 217.375 23.4319 216.903 24.6367C218.062 23.2947 219.19 21.9527 220.288 20.626C225.488 14.4193 228.279 11.2168 230.185 11.6286C230.628 11.7201 231.207 12.0556 231.482 13.062C231.756 14.0838 231.131 15.3038 229.865 17.149C232.061 15.0598 233.8 14.0228 235.02 14.4345C235.858 14.7243 236.316 15.5783 236.362 16.966C236.377 17.3777 236.057 17.7132 235.66 17.7285C235.264 17.7437 234.913 17.4235 234.898 17.027C234.867 16.2798 234.699 15.8833 234.547 15.8375C233.739 15.563 231.314 17.027 224.329 25.5669C223.567 26.4972 223.231 26.9089 223.048 27.0766C222.774 27.3206 222.377 27.3359 222.088 27.1071C221.813 26.8784 221.737 26.4666 221.935 26.1616C223.887 22.9592 225.702 20.443 227.166 18.43C228.828 16.1425 230.262 14.16 230.063 13.489C229.987 13.2145 229.896 13.1078 229.865 13.0925C228.737 12.8638 224.665 17.698 221.401 21.602C219.526 23.8437 217.406 26.3752 215.256 28.7236C215.012 28.9829 214.631 29.0439 214.326 28.8456C214.021 28.6626 213.899 28.2814 214.036 27.9611C214.051 27.9306 215.546 24.1944 217.01 20.138C217.757 18.0792 217.376 16.6 216.964 16.417C216.735 16.3103 215.729 16.6 214.234 19.2535C212.892 21.6325 208.104 31.8346 202.568 43.638C194.089 61.6938 183.551 84.1568 178.397 93.5507C170.116 108.663 168.912 109.029 157.322 112.537L155.293 113.147C155.248 113.116 155.171 113.131 155.11 113.131Z"
              fill="#AF060D"
            />
            <path
              d="M224.939 29.8521C224.772 29.8521 224.604 29.7911 224.467 29.6844C224.162 29.4251 224.116 28.9676 224.375 28.6474C224.421 28.6016 228.401 23.8132 230.993 20.9614C235.797 15.7003 237.292 16.4475 237.795 16.6915C239.122 17.3472 238.74 19.4212 238.603 20.0922C238.527 20.4887 238.146 20.7479 237.749 20.6717C237.353 20.5954 237.093 20.2142 237.17 19.8177C237.459 18.2927 237.154 18.003 237.139 18.003C237.124 18.003 235.965 17.6827 232.076 21.9527C229.499 24.7739 225.549 29.5319 225.504 29.5776C225.366 29.7606 225.153 29.8521 224.939 29.8521Z"
              fill="#AF060D"
            />
            <path
              d="M180.73 173.536C180.715 173.536 180.715 173.536 180.7 173.536C180.288 173.521 179.983 173.185 179.998 172.774L181.508 126.719C181.508 126.612 181.538 126.506 181.584 126.399C184.039 121.702 194.058 101.115 202.903 82.952C210.33 67.7022 217.345 53.2911 219.297 49.4786C223.643 40.9844 232.214 29.9588 234.882 26.7563L235.599 25.9024C237.093 24.1334 238.634 22.2881 238.527 21.6171C238.527 21.5867 238.512 21.5256 238.359 21.4341C237.444 20.8547 234.425 23.6606 229.408 29.7758C227.364 32.2615 227.196 32.4598 226.556 32.0785C226.205 31.865 226.098 31.4228 226.297 31.0721C226.373 30.9348 226.495 30.8281 226.632 30.7671C226.891 30.5231 227.593 29.6691 228.279 28.8303C232.702 23.4471 236.85 18.7349 239.137 20.1684C239.732 20.5344 239.915 21.0224 239.96 21.3732C240.174 22.7151 238.862 24.2554 236.712 26.8326L236.011 27.6713C233.373 30.8281 224.878 41.7469 220.608 50.1191C218.672 53.9011 211.657 68.3122 204.23 83.562C195.05 102.426 185.549 121.931 182.972 126.887L181.462 172.774C181.462 173.231 181.127 173.536 180.73 173.536ZM227.257 30.8281C227.273 30.8281 227.288 30.8433 227.303 30.8433C227.273 30.8433 227.273 30.8281 227.257 30.8281Z"
              fill="#AF060D"
            />
            <path
              d="M216.857 36.6382C216.812 36.6382 216.766 36.6382 216.705 36.623C216.308 36.5467 216.049 36.1502 216.141 35.7537C216.934 31.9413 214.219 28.693 214.189 28.6625C213.929 28.3575 213.96 27.9001 214.265 27.6256C214.57 27.3663 215.027 27.3968 215.302 27.7018C215.439 27.8543 218.504 31.5143 217.574 36.0435C217.498 36.3942 217.193 36.6382 216.857 36.6382Z"
              fill="#AF060D"
            />
            <path
              d="M195.629 98.8577C190.81 99.6507 184.772 96.677 179.068 90.6533C178.977 90.5618 178.855 90.4856 178.733 90.4551C178.504 90.8821 178.275 91.2938 178.046 91.7056C183.399 97.348 189.133 100.444 194.043 100.444C194.592 100.444 195.126 100.398 195.645 100.322L196.178 98.9797C196.041 98.873 195.843 98.8272 195.629 98.8577Z"
              fill="#AF060D"
            />
            <path
              d="M138.625 153.04C138.503 153.04 138.381 153.01 138.274 152.949L129.125 147.825C128.911 147.703 128.774 147.474 128.759 147.23L127.661 129.296C127.645 129.098 127.722 128.9 127.859 128.747C127.996 128.595 128.194 128.519 128.393 128.519H145.594C146.006 128.519 146.326 128.839 146.326 129.251V145.354C146.326 145.553 146.25 145.736 146.113 145.873L139.159 152.827C139.006 152.964 138.823 153.04 138.625 153.04ZM130.192 146.727L138.518 151.393L144.862 145.049V129.983H129.155L130.192 146.727Z"
              fill="#AF060D"
            />
            <path
              d="M137.405 66.5127C137.359 66.5432 137.314 66.5737 137.253 66.6042C137.207 66.589 137.161 66.5737 137.115 66.5585C136.81 66.4822 136.551 66.589 136.383 66.7872C136.292 66.711 136.2 66.65 136.078 66.6195C134.111 59.4368 124.778 62.502 122.46 67.7937C120.325 72.6279 121.774 77.9959 120.707 83.0131C120.173 85.514 119.136 87.8168 117.84 90.0432C117.702 90.272 117.55 90.516 117.413 90.76C118.724 92.895 119.99 95.0452 121.134 97.2869C121.286 97.5767 121.271 97.8664 121.164 98.0952C121.423 98.1104 121.683 98.1104 121.942 98.0952C125.77 97.8512 129.414 95.4569 131.641 92.651C134.081 89.5705 131.275 83.2571 131.076 79.5056C130.863 75.3424 133.227 72.9787 136.048 69.517C136.414 69.6085 136.78 69.3492 136.917 69.029C137.024 68.8002 137.115 68.5715 137.222 68.3427C137.497 68.114 137.802 67.9157 138.137 67.7175C138.93 67.2142 138.198 66.04 137.405 66.5127Z"
              fill="#AF060D"
            />
            <path
              d="M160.371 67.5803C162.201 62.4563 165.129 47.4505 146.463 57.6984C127.798 67.9463 129.262 92.1173 140.607 95.0452C151.938 97.9732 160.371 67.5803 160.371 67.5803Z"
              fill="#AF060D"
            />
            <path
              d="M166.791 92.1173C165.526 96.0975 161.667 97.7903 157.458 98.5223L155.11 112.384C152.182 119.338 143.764 119.338 140.47 111.652C140.607 109.289 141.751 98.446 141.904 95.4113C138.061 93.5813 135.682 86.9934 135.682 86.9934C128.545 87.3594 121.408 84.0654 122.872 76.7455C123.909 71.5606 129.002 70.9658 132.723 71.8351C134.248 72.2011 135.544 72.8111 136.231 73.4515C136.231 73.4515 135.499 67.8854 143.917 64.3016C151.16 61.2059 156.33 61.6482 159.731 65.9334C160.981 67.4889 161.972 69.5781 162.765 72.1706C165.144 80.0395 168.072 88.0914 166.791 92.1173Z"
              fill="white"
            />
            <path
              d="M148.141 118.256C144.603 118.256 141.492 115.907 139.799 111.957C139.754 111.851 139.738 111.744 139.738 111.622C139.799 110.57 140.059 107.809 140.348 104.881C140.669 101.511 141.035 97.7445 141.157 95.8535C137.939 94.0083 135.834 89.3113 135.194 87.7558C130.345 87.8778 126.12 86.4139 123.833 83.7756C122.186 81.8542 121.591 79.3837 122.155 76.6082C122.567 74.58 123.558 73.0397 125.129 72.0333C127.935 70.2338 131.488 70.798 132.891 71.1335C133.898 71.3775 134.813 71.713 135.56 72.1248C135.88 70.0813 137.344 66.3146 143.627 63.6306C151.283 60.3671 156.742 60.9771 160.31 65.4758C161.607 67.1076 162.644 69.2273 163.482 71.957C163.818 73.0855 164.169 74.1987 164.519 75.3272C166.654 82.1896 168.683 88.6861 167.508 92.346C166.365 95.9297 163.299 98.1562 158.114 99.1627L155.842 112.522C155.827 112.583 155.812 112.628 155.796 112.689C154.333 116.166 151.481 118.256 148.172 118.271C148.156 118.256 148.141 118.256 148.141 118.256ZM141.202 111.53C142.666 114.824 145.244 116.792 148.141 116.792H148.156C150.825 116.776 153.158 115.068 154.393 112.186L156.727 98.4155C156.772 98.1105 157.016 97.8665 157.321 97.8207C162.217 96.9667 165.084 95.03 166.09 91.919C167.112 88.6861 165.068 82.1286 163.101 75.7695C162.75 74.6562 162.4 73.5125 162.064 72.3992C161.302 69.883 160.326 67.87 159.151 66.4061C156.01 62.4259 151.252 61.9836 144.191 64.9878C136.368 68.3123 136.932 73.3142 136.948 73.3752C136.993 73.6802 136.826 73.9852 136.566 74.1225C136.292 74.2597 135.956 74.214 135.728 74.0157C135.118 73.4515 133.898 72.9025 132.54 72.5822C130.009 71.9875 127.539 72.2467 125.907 73.2837C124.687 74.0615 123.909 75.2815 123.574 76.9132C123.101 79.2617 123.558 81.2594 124.931 82.8301C126.974 85.1939 131.077 86.5206 135.636 86.2919C135.956 86.2766 136.246 86.4748 136.368 86.7798C136.399 86.8408 138.686 93.1085 142.224 94.786C142.499 94.908 142.651 95.1825 142.636 95.4875C142.544 97.1955 142.148 101.374 141.797 105.049C141.538 107.779 141.279 110.387 141.202 111.53Z"
              fill="#AF060D"
            />
            <path
              d="M158.923 83.5165C158.816 83.5165 158.709 83.486 158.603 83.4402C158.237 83.2725 158.084 82.8302 158.252 82.4642C159.701 79.4142 158.435 76.3643 153.433 70.8133C153.158 70.5083 153.189 70.0508 153.479 69.7763C153.784 69.5019 154.241 69.5324 154.516 69.8221C159.228 75.0375 161.561 78.8805 159.579 83.0742C159.472 83.364 159.197 83.5165 158.923 83.5165Z"
              fill="#AF060D"
            />
            <path
              d="M145.502 74.9154C146.008 74.9154 146.417 74.5058 146.417 74.0004C146.417 73.4951 146.008 73.0854 145.502 73.0854C144.997 73.0854 144.587 73.4951 144.587 74.0004C144.587 74.5058 144.997 74.9154 145.502 74.9154Z"
              fill="#AF060D"
            />
            <path
              d="M159.105 71.9875C159.611 71.9875 160.02 71.5778 160.02 71.0725C160.02 70.5671 159.611 70.1575 159.105 70.1575C158.6 70.1575 158.19 70.5671 158.19 71.0725C158.19 71.5778 158.6 71.9875 159.105 71.9875Z"
              fill="#AF060D"
            />
            <path
              d="M145.792 69.1053C145.579 68.7393 145.152 68.6631 144.786 68.8461C144.42 69.0291 144.054 69.2121 143.688 69.3798C143.337 69.5476 143.23 70.0661 143.428 70.3863C143.642 70.7523 144.069 70.8285 144.435 70.6455C144.801 70.4625 145.167 70.2796 145.533 70.1118C145.884 69.9441 145.99 69.4256 145.792 69.1053Z"
              fill="#AF060D"
            />
            <path
              d="M157.642 65.5825H156.727C155.781 65.5825 155.781 67.0465 156.727 67.0465H157.642C158.587 67.0465 158.587 65.5825 157.642 65.5825Z"
              fill="#AF060D"
            />
            <path
              d="M135.133 81.5033C134.858 81.5033 134.599 81.3508 134.477 81.0915C133.898 79.9173 130.878 77.3401 128.499 77.8281C128.103 77.9043 127.722 77.6451 127.63 77.2486C127.554 76.8521 127.813 76.4708 128.209 76.3793C131.29 75.7693 134.919 78.6973 135.789 80.4358C135.972 80.8018 135.819 81.244 135.468 81.4118C135.346 81.488 135.24 81.5033 135.133 81.5033Z"
              fill="#AF060D"
            />
            <path
              d="M143.49 65.4452C143.002 63.5237 141.187 63.9202 140.089 65.0335C138.228 66.9092 137.039 69.5627 136.338 72.0789C136.246 72.4296 136.383 72.6889 136.612 72.8414C136.459 72.8719 136.322 72.9329 136.185 72.9634C135.255 73.1464 135.651 74.5494 136.582 74.3816C140.226 73.6496 144.542 69.5627 143.49 65.4452Z"
              fill="#AF060D"
            />
            <path
              d="M162.08 88.7624C161.409 88.7624 160.814 88.3049 160.646 87.6186C160.463 86.8256 160.966 86.0479 161.744 85.8649C162.034 85.8039 191.42 79.155 198.542 77.4775C199.243 77.3097 200.113 76.9895 200.28 76.3642C200.463 75.678 199.914 74.5038 198.999 73.6498C198.222 72.9178 197.535 72.7348 197.398 72.7958C197.398 72.7958 197.368 72.8415 197.322 72.9178C197.124 73.3448 197.002 73.6803 196.925 73.909C196.956 73.8938 197.002 73.8785 197.017 73.8785C197.764 73.5888 198.618 73.9395 198.923 74.702C199.228 75.4493 198.862 76.3032 198.1 76.6082C197.718 76.7607 195.721 77.4775 194.516 76.1965C193.326 74.9308 194.028 73.0093 194.668 71.6673C195.339 70.2643 196.712 69.6086 198.252 69.9593C200.54 70.4625 203.224 73.238 203.239 76.0592C203.239 77.0657 202.858 79.4905 199.198 80.3444C192.061 82.0219 162.674 88.6709 162.369 88.7319C162.293 88.7471 162.186 88.7624 162.08 88.7624Z"
              fill="#AF060D"
            />
            <path
              d="M159.502 84.9346C162.735 87.5728 160.966 89.6925 160.966 89.6925L159.502 84.9346Z"
              fill="white"
            />
            <path
              d="M160.966 90.4244C160.798 90.4244 160.631 90.3634 160.493 90.2567C160.188 89.9974 160.143 89.5399 160.402 89.2197C160.524 89.0672 161.576 87.5727 159.029 85.4987C158.709 85.2395 158.663 84.782 158.923 84.4618C159.182 84.1568 159.639 84.0958 159.96 84.355C161.302 85.453 162.049 86.6272 162.156 87.8472C162.278 89.1892 161.591 90.0584 161.515 90.1499C161.378 90.3329 161.18 90.4244 160.966 90.4244Z"
              fill="#AF060D"
            />
            <path
              d="M236.392 107.642C232.579 107.642 229.758 104.836 228.401 102.197C227.775 100.993 227.394 99.7726 227.257 98.5984C226.799 98.4306 226.342 98.2324 225.915 97.9732C224.1 96.9362 220.181 93.6727 222.895 85.7885C223.033 85.4073 223.444 85.209 223.826 85.331C224.207 85.4683 224.405 85.88 224.283 86.2613C222.621 91.0802 223.49 94.8927 226.647 96.6922C226.845 96.7989 227.043 96.9057 227.242 96.9972C227.333 96.0059 227.623 95.1062 228.126 94.3894C229.392 92.59 230.78 92.468 231.496 92.5442C232.579 92.6815 233.525 93.4287 233.936 94.4962C234.379 95.6247 234.135 96.8752 233.296 97.8359C232.411 98.8729 230.658 99.2541 228.812 98.9644C228.98 99.7879 229.27 100.657 229.712 101.496C230.886 103.753 233.265 106.147 236.407 106.147C236.819 106.147 237.139 106.467 237.139 106.879C237.139 107.291 236.788 107.642 236.392 107.642ZM228.66 97.4852C230.276 97.8207 231.679 97.4852 232.167 96.9057C232.655 96.3414 232.793 95.6704 232.549 95.0452C232.335 94.4809 231.832 94.0844 231.298 94.0082C230.627 93.9319 229.91 94.3589 229.3 95.2282C228.889 95.8229 228.675 96.6007 228.66 97.4852Z"
              fill="#AF060D"
            />
            <path
              d="M115.156 33.2528C112.426 33.2528 110.26 32.5514 110.215 32.5361C109.833 32.4141 109.62 32.0024 109.757 31.6059C109.879 31.2246 110.306 31.0111 110.687 31.1484C111.069 31.2704 120.005 34.1373 123.345 27.1377C124.229 25.2924 124.427 23.8284 124.351 22.7152C122.826 23.0812 121.149 22.6085 120.142 21.7697C119.258 21.0377 118.938 20.0465 119.288 19.1467C119.608 18.308 120.279 17.759 121.164 17.637C122.399 17.4693 123.787 18.1708 124.702 19.4212C124.885 19.6652 125.114 20.0312 125.312 20.504C126.074 19.589 126.273 17.9878 125.846 15.8833C125.769 15.4868 126.029 15.1055 126.425 15.014C126.822 14.9378 127.203 15.197 127.294 15.5935C128.087 19.5737 126.791 21.3275 125.754 22.0747C125.968 23.4777 125.8 25.3839 124.671 27.7629C122.521 32.2311 118.434 33.2528 115.156 33.2528ZM121.515 19.0705C121.454 19.0705 121.393 19.0705 121.347 19.0857C120.996 19.1315 120.767 19.3145 120.645 19.6652C120.493 20.0617 120.798 20.4277 121.072 20.6565C121.759 21.236 122.994 21.541 124.031 21.2817C123.863 20.8395 123.665 20.504 123.497 20.2905C122.887 19.4365 122.094 19.0705 121.515 19.0705Z"
              fill="#AF060D"
            />
            <path
              d="M161.698 14.2667C161.668 14.2667 161.622 14.2667 161.592 14.2667C161.195 14.2057 160.921 13.8397 160.966 13.4432L162.796 0.633369C162.857 0.236873 163.223 -0.0528748 163.62 0.0081246C164.016 0.069124 164.291 0.435119 164.245 0.831615L162.415 13.6415C162.369 14.0075 162.064 14.2667 161.698 14.2667Z"
              fill="#AF060D"
            />
            <path
              d="M174.508 21.9678C174.356 21.9678 174.203 21.9221 174.081 21.8306C173.761 21.5866 173.685 21.1291 173.929 20.8089L177.955 15.3189C178.199 14.9987 178.656 14.9224 178.976 15.1664C179.297 15.4104 179.373 15.8679 179.129 16.1882L175.103 21.6781C174.966 21.8611 174.737 21.9678 174.508 21.9678Z"
              fill="#AF060D"
            />
            <path
              d="M35.3837 79.0785C35.0024 79.0785 34.6822 78.7735 34.6517 78.3922C34.6212 77.9957 34.9262 77.645 35.3379 77.6145C37.5034 77.4772 39.1351 76.5012 39.9586 74.8543C40.9346 72.887 40.6296 70.3251 39.1809 68.1291C38.7234 67.4581 38.2049 66.9548 37.6559 66.6194C37.5949 66.9243 37.5187 67.2293 37.4272 67.5038C36.8934 69.0898 35.8564 70.1726 34.7279 70.3251C34.2399 70.3861 33.3402 70.3251 32.6082 69.2271C32.0897 68.4646 31.9067 67.6563 32.044 66.9243C32.1812 66.2381 32.6082 65.6129 33.2487 65.1859C34.0874 64.6216 35.2007 64.3929 36.3444 64.5759C36.2224 62.6086 35.3227 60.2602 33.0505 57.9879C32.7607 57.6982 32.7607 57.2407 33.0505 56.951C33.3402 56.6612 33.7977 56.6612 34.0874 56.951C36.8477 59.7112 37.8237 62.6391 37.8237 65.0181C38.7691 65.4604 39.6841 66.2076 40.4161 67.3056C42.1546 69.9286 42.5054 73.0548 41.3006 75.4948C40.2484 77.6297 38.1744 78.8955 35.4599 79.0632C35.4142 79.0785 35.3989 79.0785 35.3837 79.0785ZM35.5514 65.9941C34.9567 65.9941 34.4229 66.1466 34.0417 66.4059C33.8129 66.5583 33.5385 66.8176 33.4622 67.1988C33.386 67.5496 33.508 67.9766 33.7977 68.4036C34.0264 68.7391 34.2704 68.8916 34.5144 68.8611C34.9567 68.8001 35.6277 68.2053 36.0242 67.0158C36.1309 66.7108 36.2072 66.3906 36.2529 66.0551C36.0242 66.0246 35.7802 65.9941 35.5514 65.9941Z"
              fill="#AF060D"
            />
            <path
              d="M83.7103 155.602L80.0503 162.19L84.4422 163.654L88.1022 157.432L83.7103 155.602Z"
              fill="#FEF2F2"
            />
            <path
              d="M167.554 117.889L171.58 123.013L175.972 119.353L169.384 113.497L167.554 117.889Z"
              fill="#FEF2F2"
            />
            <path
              d="M70.9006 63.6914L67.9727 70.2946L74.5606 71.0266L76.0246 64.0574L70.9006 63.6914Z"
              fill="white"
            />
            <path
              d="M214.051 111.302L221.737 121.549L225.031 117.157L218.809 108.374L214.051 111.302Z"
              fill="#FEF2F2"
            />
            <path
              d="M240.052 62.5935L234.562 66.6347L238.588 70.2947L242.98 65.1707L240.052 62.5935Z"
              fill="#FEF2F2"
            />
            <path
              d="M93.2261 14.2667L97.6333 17.5606L100.561 14.9987L95.0561 10.2407L93.2261 14.2667Z"
              fill="#FEF2F2"
            />
            <path
              d="M194.287 161.092L203.071 168.778L208.195 164.386L197.947 156.334L194.287 161.092Z"
              fill="#FEF2F2"
            />
            <path
              d="M209.293 151.21C208.912 151.21 208.591 150.92 208.561 150.539C208.53 150.143 208.82 149.777 209.217 149.746L217.268 149.014C217.665 148.984 218.031 149.273 218.061 149.67C218.092 150.066 217.802 150.432 217.406 150.463L209.354 151.195C209.339 151.195 209.323 151.21 209.293 151.21Z"
              fill="#AF060D"
            />
            <path
              d="M171.214 40.6337L178.9 47.2217L182.926 45.0257L175.606 38.0718L171.214 40.6337Z"
              fill="#FEF2F2"
            />
          </svg>
        </div>

        <h2
          id="claim-success-title"
          className="font-heading! text-xl md:text-2xl font-semibold text-dark-text"
        >
          Your claim request has been submitted successfully
        </h2>
        <p className="font-body! mt-3 text-sm text-body-text">
          Our team has received your details and will review them shortly. We
          will reach out to you within one business day to guide you through the
          next steps.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={onBackToHome}
            variant="outline"
            className="font-body! flex-1 rounded-full border border-brand-red bg-white text-brand-red text-sm font-medium !py-3 hover:bg-brand-red/5"
          >
            Back to Home
          </Button>
          <Button
            type="button"
            onClick={onGotIt}
            className="font-body! flex-1 rounded-full bg-brand-red text-white text-sm font-medium !py-3 hover:bg-brand-red/90"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}

const inputClasses =
  "font-body! w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-dark-text placeholder:text-body-text/60 focus:outline-none focus:ring-2 focus:ring-brand-red/40";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body! text-xs font-medium text-dark-text">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-red/10 shrink-0 text-brand-red">
        <Icon className="w-4 h-4" />
      </span>
      <div className="font-body! text-sm">
        <p className="font-body! text-body-text">{label}</p>
        <p className="font-body! font-medium text-dark-text">{children}</p>
      </div>
    </div>
  );
}
