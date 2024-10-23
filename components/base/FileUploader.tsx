'use client';

import { useDropzone } from '@uploadthing/react';
import { CloudUpload } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { cn, convertFileToUrl } from '@/utils';

import { MAX_FILE_SIZE } from '@/constants';

import { Button } from '@/components/ui/button';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  disabled?: boolean;
};

export default function FileUploader(props: FileUploaderProps) {
  const { imageUrl, onFieldChange, setFiles, disabled } = props;

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
      className={cn(
        'bg-dark flex h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border shadow-sm',
        disabled && 'cursor-not-allowed',
      )}>
      <input
        {...getInputProps()}
        disabled={disabled}
        className={cn('cursor-pointer', disabled && 'cursor-not-allowed')}
      />

      {imageUrl ? (
        <div className="group relative flex h-full w-full flex-1 items-center justify-center">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />

          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300',
              !disabled && 'group-hover:opacity-100',
            )}>
            <div className="text-white">
              <CloudUpload size={50} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center gap-2 py-5 text-gray-500">
          <CloudUpload size={77} />

          <h3 className="mb-2 mt-2">Drag your photo here</h3>

          <div className="mb-4 grid gap-2 text-center text-xs font-semibold">
            <p>
              Supported formats: <span className="font-normal">SVG, PNG, JPG</span>
            </p>

            <p>
              Max file size: <span className="font-normal">{MAX_FILE_SIZE}</span>
            </p>
          </div>

          <Button type="button" disabled={disabled} className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
