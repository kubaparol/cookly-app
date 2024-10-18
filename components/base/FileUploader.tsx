"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/utils";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import { CloudUpload } from "lucide-react";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileUploader(props: FileUploaderProps) {
  const { imageUrl, onFieldChange, setFiles } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center bg-dark cursor-pointer flex-col overflow-hidden border rounded-lg shadow-sm h-80"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="group relative h-full w-full flex flex-1 justify-center items-center">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
            <div className="text-white">
              <CloudUpload size={50} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-2 place-items-center py-5 text-gray-500">
          <CloudUpload size={77} />

          <h3 className="mb-2 mt-2">Drag your photo here</h3>

          <p className="text-xs font-semibold mb-4">
            Supported formats:{" "}
            <span className="font-normal">SVG, PNG, JPG</span>
          </p>

          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
