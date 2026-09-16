"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { AppHero } from "@/components/ui/app-hero";
import { SlideUp } from "@/components/ui/animated";
import { config } from "./config";

export default function CutDCropPage() {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-12">
      <AppHero config={config.hero} />
      <div className="flex-1 min-w-0">
        <SlideUp>
          <FileUpload
            acceptedTypes={config.acceptedTypes}
            accept={config.accept}
            maxSizeMB={config.maxSizeMB}
            description="PDF only — Max 10MB"
            onFileSelect={() => {}}
            onClear={() => {}}
          />
        </SlideUp>
      </div>
    </div>
  );
}
