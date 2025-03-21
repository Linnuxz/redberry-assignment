import React, { useState } from "react";
import TrashIcon from "../assets/trash-2.svg";

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
}

const ImageUpload = ({ label, onChange }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("ატვირთეთ მხოლოდ სურათი");
        return;
      }

      if (selectedFile.size > 600 * 1024) {
        alert("ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს");
        return;
      }

      onChange(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    setPreview(undefined);
  };

  return (
    <div className="flex flex-col">
      <label className="py-[3px] text-[14px] font-medium text-[#343A40]">
        {label}
      </label>
      <div className="flex h-[120px] items-center justify-center rounded-[8px] border-1 border-dashed border-[#CED4DA]">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />

        <label
          htmlFor="file-upload"
          className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 hover:duration-500"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="z-4 h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-500">+</span>
          )}

          {preview && (
            <button
              onClick={handleRemove}
              className="absolute right-0 -bottom-1 z-5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white text-white"
            >
              <img src={TrashIcon} alt="delete" />
            </button>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
