import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  apiEndPoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url?: string) => void;
  value?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  apiEndPoint,
  onChange,
  value,
}) => {
  const type = value?.split(".").pop();

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== "pdf" ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="upload image"
              className="object-container"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer  "
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            ></a>
          </div>
        )}

        <Button onClick={() => onChange("")} variant="ghost" type="button">
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};
