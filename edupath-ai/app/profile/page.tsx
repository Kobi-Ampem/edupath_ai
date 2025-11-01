"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      window.location.href = `/login?redirect=profile`;
    } else {
      // Load user data
      const email = localStorage.getItem("userEmail") || "";
      const firstName = localStorage.getItem("userFirstName") || "";
      const lastName = localStorage.getItem("userLastName") || "";

      setUserData({ email, firstName, lastName });
      setEditedData({ email, firstName, lastName });
      setIsCheckingAuth(false);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update localStorage
      localStorage.setItem("userFirstName", editedData.firstName);
      localStorage.setItem("userLastName", editedData.lastName);
      localStorage.setItem("userEmail", editedData.email);

      // Update state
      setUserData({ ...editedData });
      setIsEditing(false);

      // Dispatch event for navbar update
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#16465B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#16465B]">Loading...</p>
        </div>
      </div>
    );
  }

  const fullName =
    `${userData.firstName} ${userData.lastName}`.trim() || "User";
  const initials =
    userData.firstName && userData.lastName
      ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
      : userData.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95 py-12">
      <Navbar />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 pt-24">
          <h1 className="text-4xl font-bold text-[#16465B] mb-4">My Profile</h1>
          <p className="text-[#16465B]/70 text-lg max-w-2xl mx-auto">
            Manage your account information and view your progress
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#16465B] to-[#16465B]/70 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {initials}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#16465B]">
                        {fullName}
                      </h2>
                      <p className="text-[#16465B]/70">{userData.email}</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 text-[#16465B] hover:bg-[#16465B]/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {/* Profile Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#16465B] mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={editedData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B] text-[#16465B]"
                      />
                    ) : (
                      <p className="text-[#16465B]/80 px-4 py-3 bg-[#16465B]/5 rounded-lg">
                        {userData.firstName || "Not set"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#16465B] mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={editedData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B] text-[#16465B]"
                      />
                    ) : (
                      <p className="text-[#16465B]/80 px-4 py-3 bg-[#16465B]/5 rounded-lg">
                        {userData.lastName || "Not set"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#16465B] mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B] text-[#16465B]"
                      />
                    ) : (
                      <p className="text-[#16465B]/80 px-4 py-3 bg-[#16465B]/5 rounded-lg">
                        {userData.email}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 px-6 py-3 bg-[#16465B] hover:bg-[#16465B]/90 disabled:bg-[#16465B]/50 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Saving...
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex-1 px-6 py-3 border border-[#16465B]/20 hover:bg-[#16465B]/5 text-[#16465B] rounded-lg font-semibold transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#16465B]/20">
                <h3 className="text-lg font-bold text-[#16465B] mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#16465B]/70">Account Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#16465B]/70">Member Since</span>
                    <span className="text-[#16465B] font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#16465B]/20">
                <h3 className="text-lg font-bold text-[#16465B] mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <a
                    href="/assessment"
                    className="block px-4 py-3 bg-[#16465B]/5 hover:bg-[#16465B]/10 text-[#16465B] rounded-lg transition-colors duration-200 text-center font-medium"
                  >
                    Take Assessment
                  </a>
                  <a
                    href="/grades"
                    className="block px-4 py-3 bg-[#16465B]/5 hover:bg-[#16465B]/10 text-[#16465B] rounded-lg transition-colors duration-200 text-center font-medium"
                  >
                    Upload Grades
                  </a>
                  <a
                    href="/chat"
                    className="block px-4 py-3 bg-[#16465B]/5 hover:bg-[#16465B]/10 text-[#16465B] rounded-lg transition-colors duration-200 text-center font-medium"
                  >
                    Chat with Advisor
                  </a>
                </div>
              </div>

              {/* Account Security */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#16465B]/20">
                <h3 className="text-lg font-bold text-[#16465B] mb-4">
                  Account Security
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#16465B]/70">Password</span>
                    <button className="text-sm text-[#16465B] hover:underline font-medium">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#16465B]/70">
                      Two-Factor Auth
                    </span>
                    <button className="text-sm text-[#16465B] hover:underline font-medium">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
