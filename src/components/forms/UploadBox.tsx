import { useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  visible: boolean;
  onFilesAccepted: (files: File[]) => void;
};

const UploadBox = ({ visible, onFilesAccepted }: Props) => {
  const [dropRejected, setDropRejected] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 100000,
    onDropAccepted: onFilesAccepted,
    onDropRejected: () => setDropRejected(true),
    onFileDialogOpen: () => setDropRejected(false),
  });

  if (!visible) {
    return null;
  }

  return (
    <div
      {...getRootProps({
        className:
          "flex justify-center rounded-md border-2 border-dashed border-black/60 px-6 pt-5 pb-6 mt-5",
      })}
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {dropRejected ? (
          <span className="text-red-600 text-sm">
            Please upload a valid file!
          </span>
        ) : (
          <>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-bluemedium focus-within:outline-none focus-within:ring-2 focus-within:ring-bluemedium focus-within:ring-offset-2 hover:text-bluemedium/80"
              >
                Upload a file
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  {...getInputProps()}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
