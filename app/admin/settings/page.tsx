"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/user-store";
import { toast } from "@/lib/utils/toast";

type Tab = "personal" | "password";

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // Personal Info state — prefilled from the signed-in user
  const [fullName, setFullName] = useState(user?.fullname ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // Keep fields in sync once the persisted user hydrates / changes
  useEffect(() => {
    setFullName(user?.fullname ?? "");
    setEmail(user?.email ?? "");
  }, [user?.fullname, user?.email]);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePersonalSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUser({ ...user, fullname: fullName.trim(), email: email.trim() });
    toast.success("Personal information saved");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password updated");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
          <div className="flex border-b border-gray-100 bg-[#F9FAFB] p-1 rounded-[8px] w-full">
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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email address"
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
      className={`px-6 py-2 text-sm font-semibold border-b-2 transition-colors ${
        active
          ? "border-red-700 text-red-700 bg-white"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
