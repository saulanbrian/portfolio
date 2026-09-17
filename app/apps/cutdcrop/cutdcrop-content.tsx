"use client";

import { AppHero } from "@/components/ui/app-hero";
import { SlideUp } from "@/components/ui/animated";
import { MaintenanceNotice } from "@/components/ui/maintenance";
import { FileUpload } from "@/components/ui/file-upload";
import { cutdcropConfig } from "@/lib/cutdcrop/config";

interface Props {
  enabled: boolean;
}

export function CutDCropContent({ enabled }: Props) {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-12">
      <AppHero config={cutdcropConfig.hero} />
      <div className="flex-1 min-w-0">
        <SlideUp>
          {enabled ? (
            <FileUpload
              acceptedTypes={cutdcropConfig.upload.acceptedTypes}
              accept={cutdcropConfig.upload.accept}
              maxSizeMB={cutdcropConfig.upload.maxSizeMB}
              description={cutdcropConfig.upload.description}
              onFileSelect={() => {}}
              onClear={() => {}}
            />
          ) : (
            <MaintenanceNotice appName={cutdcropConfig.name} />
          )}
        </SlideUp>
      </div>
    </div>
  );
}