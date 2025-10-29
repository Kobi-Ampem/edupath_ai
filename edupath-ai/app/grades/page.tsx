"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function GradesPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [grades, setGrades] = useState<
    Array<{
      id: number;
      subject: string;
      grade: string;
      credits: number;
      semester: string;
    }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // In a real app, you would process the file here
        console.log("File uploaded:", file.name);
      }, 2000);
    }
  };

  const addGradeRow = () => {
    const newGrade = {
      id: Date.now(),
      subject: "",
      grade: "",
      credits: 0,
      semester: "",
    };
    setGrades([...grades, newGrade]);
  };

  const updateGrade = (id: number, field: string, value: string | number) => {
    setGrades(
      grades.map((grade) =>
        grade.id === id ? { ...grade, [field]: value } : grade
      )
    );
  };

  const removeGrade = (id: number) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  const handleSubmit = () => {
    if (activeTab === "upload" && uploadedFile) {
      // Handle file upload submission
      console.log("Submitting uploaded file:", uploadedFile.name);
    } else if (activeTab === "manual" && grades.length > 0) {
      // Handle manual grade submission
      console.log("Submitting grades:", grades);
    }
    // Redirect to results or next step
    router.push("/assessment");
  };

  const isFormValid = () => {
    if (activeTab === "upload") {
      return uploadedFile !== null;
    } else {
      return (
        grades.length > 0 &&
        grades.every(
          (grade) =>
            grade.subject && grade.grade && grade.credits > 0 && grade.semester
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/95 py-12">
      <Navbar />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 pt-24">
          <h1 className="text-4xl font-bold text-[#16465B] mb-4">
            Upload Your Grades
          </h1>
          <p className="text-[#16465B]/70 text-lg max-w-2xl mx-auto">
            Help us understand your academic performance by uploading your
            transcript or entering your grades manually.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 border border-[#16465B]/20">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "upload"
                    ? "bg-[#16465B] text-white shadow-lg"
                    : "text-[#16465B]/70 hover:text-[#16465B]"
                }`}
              >
                Upload Document
              </button>
              <button
                onClick={() => setActiveTab("manual")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "manual"
                    ? "bg-[#16465B] text-white shadow-lg"
                    : "text-[#16465B]/70 hover:text-[#16465B]"
                }`}
              >
                Enter Manually
              </button>
            </div>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#16465B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-[#16465B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#16465B] mb-4">
                  Upload Your Transcript
                </h3>
                <p className="text-[#16465B]/70 mb-8">
                  Upload your academic transcript in PDF, DOC, or image format
                </p>

                <div className="border-2 border-dashed border-[#16465B]/30 rounded-xl p-8 mb-6 hover:border-[#16465B]/50 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#16465B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-[#16465B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <p className="text-[#16465B] font-semibold mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[#16465B]/60 text-sm">
                        PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="bg-[#16465B]/5 border border-[#16465B]/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#16465B]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-[#16465B]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[#16465B]">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-[#16465B]/60">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      {isProcessing ? (
                        <div className="flex items-center text-[#16465B]">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#16465B] mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="text-green-600 font-semibold">
                          ✓ Ready
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manual Entry Tab */}
          {activeTab === "manual" && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#16465B]/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#16465B] mb-4">
                  Enter Your Grades
                </h3>
                <p className="text-[#16465B]/70">
                  Add your courses and grades to build your academic profile
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {grades.map((grade) => (
                  <div
                    key={grade.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-[#16465B]/5 rounded-lg border border-[#16465B]/10"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#16465B] mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={grade.subject}
                        onChange={(e) =>
                          updateGrade(grade.id, "subject", e.target.value)
                        }
                        placeholder="e.g., Mathematics"
                        className="w-full px-3 py-2 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#16465B] mb-1">
                        Grade
                      </label>
                      <select
                        value={grade.grade}
                        onChange={(e) =>
                          updateGrade(grade.id, "grade", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B]"
                      >
                        <option value="">Select Grade</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#16465B] mb-1">
                        Credits
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={grade.credits}
                        onChange={(e) =>
                          updateGrade(
                            grade.id,
                            "credits",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#16465B] mb-1">
                        Semester
                      </label>
                      <input
                        type="text"
                        value={grade.semester}
                        onChange={(e) =>
                          updateGrade(grade.id, "semester", e.target.value)
                        }
                        placeholder="e.g., Fall 2023"
                        className="w-full px-3 py-2 border border-[#16465B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16465B]/20 focus:border-[#16465B]"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => removeGrade(grade.id)}
                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addGradeRow}
                className="w-full py-3 border-2 border-dashed border-[#16465B]/30 rounded-lg text-[#16465B] font-semibold hover:border-[#16465B]/50 hover:bg-[#16465B]/5 transition-all duration-300"
              >
                + Add Another Course
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 text-[#16465B]/70 hover:text-[#16465B] font-semibold transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="px-8 py-3 bg-[#16465B] hover:bg-[#16465B]/90 disabled:bg-[#16465B]/50 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              Continue to Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
