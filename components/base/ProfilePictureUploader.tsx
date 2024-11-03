import { Camera, Trash } from 'lucide-react';
import { useRef } from 'react';

import { convertFileToUrl } from '@/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '../ui/button';

interface ProfilePictureUploaderProps {
  value: File | string;
  onFieldChange: (file: File | null) => void;
  disabled?: boolean;
}

export default function ProfilePictureUploader(props: ProfilePictureUploaderProps) {
  const { value, onFieldChange, disabled } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFieldChange(file);
    }
  };

  return (
    <div className="flex items-center gap-4 xxs:gap-6">
      <Avatar className="size-20 xxs:size-24">
        <AvatarImage
          src={value instanceof File ? convertFileToUrl(value) : value || ''}
          alt="Profile picture"
        />
        <AvatarFallback>{value ? 'Loading...' : 'No image'}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}>
          <Camera className="mr-2 h-4 w-4" />
          Select a photo
        </Button>

        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={() => onFieldChange(null)}
          disabled={disabled}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
