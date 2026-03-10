"use client";
import React, { useState } from "react";
import FileUpload from "@/components/ui/FileUpload";

export default function FileUploadDemoPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleUpload = async (_files: File[]) => {
    setUploadStatus("Uploading...");
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploadStatus("Upload complete!");
    setTimeout(() => setUploadStatus(""), 3000);
  };

  const handleChange = (files: File[]) => {
    setUploadedFiles(files);
  };

  return (
    <div className="min-h-screen bg-surface-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            FileUpload Component Demo
          </h1>
          <p className="text-foreground-muted">
            Drag-and-drop file upload with progress indicators and validation
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Upload */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Basic Upload
            </h2>
            <FileUpload />
          </section>

          {/* Image Upload with Preview */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Image Upload with Preview
            </h2>
            <FileUpload
              accept="image/*"
              multiple
              showPreview
              onChange={handleChange}
            />
            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-950/20 rounded-lg">
                <p className="text-sm text-foreground">
                  Selected {uploadedFiles.length} file(s)
                </p>
              </div>
            )}
          </section>

          {/* Upload with Size Limit */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Upload with Size Limit (5MB)
            </h2>
            <FileUpload
              maxSize={5 * 1024 * 1024}
              accept="image/*,application/pdf"
            />
          </section>

          {/* Multiple Files with Limit */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Multiple Files (Max 3)
            </h2>
            <FileUpload multiple maxFiles={3} />
          </section>

          {/* Upload with Progress */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Upload with Progress Indicator
            </h2>
            <FileUpload
              multiple
              onUpload={handleUpload}
              accept="image/*"
              showPreview
            />
            {uploadStatus && (
              <div className="mt-4 p-3 bg-success-50 dark:bg-success-950/20 rounded-lg">
                <p className="text-sm text-success-700 dark:text-success-400">
                  {uploadStatus}
                </p>
              </div>
            )}
          </section>

          {/* Document Upload */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Document Upload (PDF, DOC, DOCX)
            </h2>
            <FileUpload
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              multiple
              maxSize={10 * 1024 * 1024}
            />
          </section>

          {/* Disabled State */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Disabled State
            </h2>
            <FileUpload disabled />
          </section>

          {/* Without Preview */}
          <section className="bg-surface-card p-6 rounded-xl border border-surface-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Without Image Preview
            </h2>
            <FileUpload accept="image/*" multiple showPreview={false} />
          </section>
        </div>

        {/* Usage Example */}
        <section className="mt-8 bg-surface-card p-6 rounded-xl border border-surface-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Usage Example
          </h2>
          <pre className="bg-surface-bg p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-foreground-muted">{`import FileUpload from "@/components/ui/FileUpload";

// Basic usage
<FileUpload />

// With file type restrictions
<FileUpload accept="image/*" />

// Multiple files with limits
<FileUpload 
  multiple 
  maxFiles={5}
  maxSize={10 * 1024 * 1024}
/>

// With upload handler
<FileUpload 
  onUpload={async (files) => {
    // Upload logic here
  }}
/>

// With change handler
<FileUpload 
  onChange={(files) => {
    console.log("Selected files:", files);
  }}
/>`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
