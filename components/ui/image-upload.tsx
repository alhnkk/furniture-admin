"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { url: string; publicId: string }) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSuccess = (result: { info?: unknown }) => {
    const uploadResult = result;

    if (
      uploadResult?.info &&
      typeof uploadResult.info === "object" &&
      uploadResult.info !== null &&
      "secure_url" in uploadResult.info &&
      "public_id" in uploadResult.info
    ) {
      const info = uploadResult.info as {
        secure_url: string;
        public_id: string;
      };
      onChange({
        url: info.secure_url,
        publicId: info.public_id,
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
              sizes="(max-width: 200px) 100vw, 200px"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onSuccess} uploadPreset="ml_default">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Resim Yükle
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
