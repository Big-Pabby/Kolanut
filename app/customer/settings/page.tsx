"use client";

import { useState } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";

type Tab = "personal" | "password" | "id-card";

export default function CustomerSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  // Personal Info state
  const [fullName, setFullName] = useState("Mauteen Adeleke");
  const [email, setEmail] = useState("mauteenadeleke@gmail.com");
  const [phone, setPhone] = useState("+234 812 345 6789");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ID Card state
  const [idType, setIdType] = useState("national-id");
  const [idNumber, setIdNumber] = useState("");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const handlePersonalSave = (e: React.FormEvent) => {
    e.preventDefault();
    // handle save logic
    alert("Personal information saved!");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Password updated!");
  };

  const handleIdCardSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idNumber || !frontImage || !backImage) {
      alert("Please fill in all fields and upload both sides of your ID.");
      return;
    }
    alert("Identification card saved!");
  };

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFrontImage(file);
      setFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackImage(file);
      setBackPreview(URL.createObjectURL(file));
    }
  };

  const removeFrontImage = () => {
    setFrontImage(null);
    setFrontPreview(null);
  };

  const removeBackImage = () => {
    setBackImage(null);
    setBackPreview(null);
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:items-start sm:justify-between gap-2 p-4 bg-white border border-[#F3F4F6] rounded-[8px]">
          <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
            Account Setting
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account.</p>
          {/* Tabs */}
          <div className="flex border-b border-gray-100 bg-[#F9FAFB] p-1 rounded-[8px] w-full overflow-x-auto">
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
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                >
                  Save Changes
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
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm text-gray-600"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}

          {activeTab === "id-card" && (
            <form onSubmit={handleIdCardSave} className="space-y-6">
              <h2 className="text-base font-heading font-semibold text-gray-800 mb-2">
                Identification Card
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Please upload a valid government-issued identification document.
              </p>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="idType">
                  ID Type
                </label>
                <select
                  id="idType"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                >
                  <option value="national-id">National ID</option>
                  <option value="passport">International Passport</option>
                  <option value="drivers-license">Driver's License</option>
                  <option value="voters-card">Voter's Card</option>
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
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter your ID number"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
              </div>

              {/* Front of ID */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">
                  Front of ID Card
                </label>
                {!frontPreview ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFrontImageChange}
                      className="hidden"
                      id="front-image-upload"
                    />
                    <label
                      htmlFor="front-image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Click to upload front side
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG, PDF up to 5MB
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={frontPreview}
                          alt="Front of ID"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {frontImage?.name}
                        </p>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle className="w-3 h-3" />
                          Uploaded successfully
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFrontImage}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Back of ID */}
              <div className="space-y-1.5">
                <label className="text-sm text-gray-600">Back of ID Card</label>
                {!backPreview ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleBackImageChange}
                      className="hidden"
                      id="back-image-upload"
                    />
                    <label
                      htmlFor="back-image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Click to upload back side
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG, PDF up to 5MB
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={backPreview}
                          alt="Back of ID"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {backImage?.name}
                        </p>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle className="w-3 h-3" />
                          Uploaded successfully
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeBackImage}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                >
                  Save ID Information
                </button>
              </div>
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
