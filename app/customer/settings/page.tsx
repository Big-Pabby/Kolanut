"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Upload, X, CheckCircle } from "lucide-react";
import { toast } from "@/lib/utils/toast";
import { PasswordInput } from "@/components/ui/password-input";
import {
  FULLNAME_MAX_LENGTH,
  FULLNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
  useIdentityCard,
  useMe,
  useUpdateIdentityCard,
  useUpdateMe,
  useUploadIdentityCardImage,
} from "./hooks";

const TABS = ["personal", "password", "id-card"] as const;
type Tab = (typeof TABS)[number];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition";
const submitClass =
  "bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

function CustomerSettingsContent() {
  // ?tab=id-card lets other pages (e.g. the dashboard's "Complete KYC" call to
  // action) deep-link straight into a tab. A tab the user picks themselves
  // takes precedence from then on.
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as Tab | null;
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const activeTab =
    selectedTab ??
    (tabFromUrl && TABS.includes(tabFromUrl) ? tabFromUrl : "personal");
  const setActiveTab = setSelectedTab;

  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data: identityCard, isLoading: isLoadingCard } = useIdentityCard();
  const updateMe = useUpdateMe();
  const updateIdentityCard = useUpdateIdentityCard();
  const uploadImage = useUploadIdentityCardImage();

  // Each field holds `null` until the user edits it, so the fetched value shows
  // through without having to sync server data into state inside an effect.
  const [fullNameEdit, setFullNameEdit] = useState<string | null>(null);
  const [phoneEdit, setPhoneEdit] = useState<string | null>(null);
  const [dateOfBirthEdit, setDateOfBirthEdit] = useState<string | null>(null);
  const [stateEdit, setStateEdit] = useState<string | null>(null);
  const [cityEdit, setCityEdit] = useState<string | null>(null);
  const [streetAddressEdit, setStreetAddressEdit] = useState<string | null>(
    null,
  );
  const fullName = fullNameEdit ?? me?.fullname ?? "";
  const phone = phoneEdit ?? me?.phone_number ?? "";
  const dateOfBirth = dateOfBirthEdit ?? me?.date_of_birth ?? "";
  const state = stateEdit ?? me?.state ?? "";
  const city = cityEdit ?? me?.city ?? "";
  const streetAddress = streetAddressEdit ?? me?.street_address ?? "";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idTypeEdit, setIdTypeEdit] = useState<string | null>(null);
  const [idNumberEdit, setIdNumberEdit] = useState<string | null>(null);
  const [dateIssuedEdit, setDateIssuedEdit] = useState<string | null>(null);
  const [expiryDateEdit, setExpiryDateEdit] = useState<string | null>(null);
  const idType = idTypeEdit ?? identityCard?.id_type ?? "national-id";
  const idNumber = idNumberEdit ?? identityCard?.identification_number ?? "";
  const dateIssued = dateIssuedEdit ?? identityCard?.date_issued ?? "";
  const expiryDate = expiryDateEdit ?? identityCard?.expiry_date ?? "";

  const [idImage, setIdImage] = useState<File | null>(null);
  const [idImagePreview, setIdImagePreview] = useState<string | null>(null);
  const currentImage = idImagePreview ?? identityCard?.image ?? null;

  // A verified identity is locked on the server, so the card fields become
  // read-only rather than letting the customer edit details that cannot change.
  const isIdentityVerified = me?.identification_verified === true;
  const idFieldsDisabled = isLoadingMe || isLoadingCard || isIdentityVerified;
  const idInputClass = isIdentityVerified
    ? `${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`
    : inputClass;

  const handlePersonalSave = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedState = state.trim();
    const trimmedCity = city.trim();
    const trimmedStreetAddress = streetAddress.trim();

    if (
      trimmedName.length < FULLNAME_MIN_LENGTH ||
      trimmedName.length > FULLNAME_MAX_LENGTH
    ) {
      toast.error("Invalid full name", {
        description: `Full name must be between ${FULLNAME_MIN_LENGTH} and ${FULLNAME_MAX_LENGTH} characters.`,
      });
      return;
    }

    if (trimmedPhone && trimmedPhone.length < PHONE_MIN_LENGTH) {
      toast.error("Invalid phone number", {
        description: `Phone number must be at least ${PHONE_MIN_LENGTH} digits.`,
      });
      return;
    }

    updateMe.mutate(
      {
        fullname: trimmedName,
        ...(trimmedPhone ? { phone_number: trimmedPhone } : {}),
        ...(dateOfBirth ? { date_of_birth: dateOfBirth } : {}),
        ...(trimmedState ? { state: trimmedState } : {}),
        ...(trimmedCity ? { city: trimmedCity } : {}),
        ...(trimmedStreetAddress
          ? { street_address: trimmedStreetAddress }
          : {}),
      },
      {
        onSuccess: () => {
          setFullNameEdit(null);
          setPhoneEdit(null);
          setDateOfBirthEdit(null);
          setStateEdit(null);
          setCityEdit(null);
          setStreetAddressEdit(null);
          toast.success("Personal information saved");
        },
      },
    );
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Missing details", {
        description: "Enter your current password and a new one.",
      });
      return;
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      toast.error("Password too short", {
        description: `New password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "The new password and confirmation must be identical.",
      });
      return;
    }

    updateMe.mutate(
      { old_password: currentPassword, new_password: newPassword },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          toast.success("Password updated");
        },
      },
    );
  };

  const handleIdCardSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isIdentityVerified) return;

    if (!idNumber.trim() || !dateIssued || !expiryDate) {
      toast.error("Missing details", {
        description:
          "Enter your ID number, issue date and expiry date to continue.",
      });
      return;
    }

    if (!idImage && !identityCard?.image) {
      toast.error("Missing document", {
        description: "Upload a photo of your ID to continue.",
      });
      return;
    }

    if (Date.parse(expiryDate) <= Date.parse(dateIssued)) {
      toast.error("Invalid dates", {
        description: "The expiry date must be after the issue date.",
      });
      return;
    }

    try {
      // A newly picked file has to be hosted before the card can reference it.
      const image = idImage
        ? (await uploadImage.mutateAsync(idImage)).url
        : (identityCard?.image as string);

      updateIdentityCard.mutate(
        {
          image,
          id_type: idType,
          identification_number: idNumber.trim(),
          date_issued: dateIssued,
          expiry_date: expiryDate,
        },
        {
          onSuccess: () => {
            setIdImage(null);
            setIdImagePreview(null);
            setIdTypeEdit(null);
            setIdNumberEdit(null);
            setDateIssuedEdit(null);
            setExpiryDateEdit(null);
          },
        },
      );
    } catch {
      // the upload mutation already surfaced the error
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdImage(file);
      setIdImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setIdImage(null);
    setIdImagePreview(null);
  };

  const isSavingIdCard = uploadImage.isPending || updateIdentityCard.isPending;

  return (
    <div className="min-h-screen">
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-white rounded-[10px] border border-[#F3F4F6] p-4">
          <h1 className="text-xl md:text-2xl font-heading font-bold text-gray-900 tracking-tight">
            Account
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Manage your personal details, password and identification
          </p>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-4 border-b border-gray-100 overflow-x-auto">
            <TabButton
              label="Personal Information"
              active={activeTab === "personal"}
              onClick={() => setActiveTab("personal")}
            />
            <TabButton
              label="Password"
              active={activeTab === "password"}
              onClick={() => setActiveTab("password")}
            />
            <TabButton
              label="Identification Card"
              active={activeTab === "id-card"}
              onClick={() => setActiveTab("id-card")}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[10px] border border-[#F3F4F6] p-4 overflow-hidden max-w-[512px] w-full">
          {activeTab === "personal" && (
            <form onSubmit={handlePersonalSave} className="space-y-6">
              <h2 className="text-base font-heading font-semibold text-gray-800 mb-2">
                Personal Information
              </h2>
              <hr />

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  disabled={isLoadingMe}
                  onChange={(e) => setFullNameEdit(e.target.value)}
                  placeholder={isLoadingMe ? "Loading..." : "Enter your name"}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={me?.email ?? ""}
                  readOnly
                  disabled
                  className={`${inputClass} bg-gray-50 text-gray-500`}
                />
                <p className="text-xs text-gray-400">
                  Contact support to change the email on your account.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  disabled={isLoadingMe}
                  onChange={(e) => setPhoneEdit(e.target.value)}
                  placeholder="e.g. 08123456789"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  disabled={isLoadingMe}
                  onChange={(e) => setDateOfBirthEdit(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-600" htmlFor="state">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={state}
                    disabled={isLoadingMe}
                    onChange={(e) => setStateEdit(e.target.value)}
                    placeholder="Enter your state"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-gray-600" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    disabled={isLoadingMe}
                    onChange={(e) => setCityEdit(e.target.value)}
                    placeholder="Enter your city"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm text-gray-600"
                  htmlFor="streetAddress"
                >
                  Street Address
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  value={streetAddress}
                  disabled={isLoadingMe}
                  onChange={(e) => setStreetAddressEdit(e.target.value)}
                  placeholder="Enter your street address"
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoadingMe || updateMe.isPending}
                  className={submitClass}
                >
                  {updateMe.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handlePasswordSave} className="space-y-6">
              <h2 className="text-base font-heading font-semibold text-gray-800 mb-2">
                Change Password
              </h2>

              <div className="space-y-1.5">
                <label
                  className="text-sm text-gray-600"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <PasswordInput
                  id="currentPassword"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className={`${inputClass} h-auto`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="newPassword">
                  New Password
                </label>
                <PasswordInput
                  id="newPassword"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={`${inputClass} h-auto`}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm text-gray-600"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <PasswordInput
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className={`${inputClass} h-auto`}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={updateMe.isPending}
                  className={submitClass}
                >
                  {updateMe.isPending ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "id-card" && (
            <form onSubmit={handleIdCardSave} className="space-y-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h2 className="text-base font-heading font-semibold text-gray-800">
                  Identification Card
                </h2>
                {isIdentityVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {isIdentityVerified
                  ? "Your identity has been verified, so these details can no longer be edited. Contact support if anything needs to change."
                  : "Please upload a valid government-issued identification document."}
              </p>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="idType">
                  ID Type
                </label>
                <select
                  id="idType"
                  value={idType}
                  disabled={idFieldsDisabled}
                  onChange={(e) => setIdTypeEdit(e.target.value)}
                  className={idInputClass}
                >
                  <option value="national-id">National ID</option>
                  <option value="passport">International Passport</option>
                  <option value="drivers-license">Driver&apos;s License</option>
                  <option value="voters-card">Voter&apos;s Card</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="idNumber">
                  ID Number
                </label>
                <input
                  id="idNumber"
                  type="text"
                  value={idNumber}
                  disabled={idFieldsDisabled}
                  onChange={(e) => setIdNumberEdit(e.target.value)}
                  placeholder="Enter your ID number"
                  className={idInputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-600" htmlFor="dateIssued">
                    Date Issued
                  </label>
                  <input
                    id="dateIssued"
                    type="date"
                    value={dateIssued}
                    disabled={idFieldsDisabled}
                    onChange={(e) => setDateIssuedEdit(e.target.value)}
                    className={idInputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-gray-600" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="date"
                    value={expiryDate}
                    disabled={idFieldsDisabled}
                    onChange={(e) => setExpiryDateEdit(e.target.value)}
                    className={idInputClass}
                  />
                </div>
              </div>

              {/* ID document */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">ID Document</label>
                {!currentImage ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleImageChange}
                      disabled={idFieldsDisabled}
                      className="hidden"
                      id="id-image-upload"
                    />
                    <label
                      htmlFor={
                        isIdentityVerified ? undefined : "id-image-upload"
                      }
                      className={`flex flex-col items-center gap-2 ${
                        isIdentityVerified
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload
                      </span>
                      <span className="text-xs text-gray-400">
                        PNG, JPG or PDF
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-lg border border-gray-200 p-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800 truncate">
                          {idImage ? idImage.name : "Uploaded document"}
                        </p>
                        <a
                          href={currentImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-red-700 hover:underline"
                        >
                          View document
                        </a>
                      </div>
                    </div>
                    {idImage && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {!isIdentityVerified && (
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isLoadingCard || isSavingIdCard}
                    className={submitClass}
                  >
                    {isSavingIdCard ? "Saving..." : "Save ID Information"}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
        active
          ? "border-red-700 text-red-700 bg-white"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

export default function CustomerSettingsPage() {
  return (
    <Suspense fallback={null}>
      <CustomerSettingsContent />
    </Suspense>
  );
}
