'use client';

import { useDropzone } from '@uploadthing/react';
import { CloudUpload } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { convertFileToUrl } from '@/utils';

import { Button } from '@/components/ui/button';

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
    [onFieldChange, setFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  });

  return (
    <div
      {...getRootProps()}
      className="bg-dark flex h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border shadow-sm">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="group relative flex h-full w-full flex-1 items-center justify-center">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="text-white">
              <CloudUpload size={50} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center gap-2 py-5 text-gray-500">
          <CloudUpload size={77} />

          <h3 className="mb-2 mt-2">Drag your photo here</h3>

          <p className="mb-4 text-xs font-semibold">
            Supported formats: <span className="font-normal">SVG, PNG, JPG</span>
          </p>

          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
