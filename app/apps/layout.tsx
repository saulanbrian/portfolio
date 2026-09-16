import type { ReactNode } from "react";
import { BackLink } from "@/components/ui/back-link";

export default function AppsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <BackLink />
        {children}
      </div>
    </div>
  );
}
