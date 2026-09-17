"use client";

interface MaintenanceNoticeProps {
  appName?: string;
}

export function MaintenanceNotice({
  appName = "This feature",
}: MaintenanceNoticeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-border bg-background-surface p-12 text-center">
      <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <div className="max-w-sm">
        <h3 className="text-xl font-bold text-foreground">Under Maintenance</h3>
        <p className="mt-2 text-foreground-muted">
          {appName} demo is temporarily unavailable. Please check back later.
        </p>
        <p className="mt-4 text-sm text-foreground-muted">
          The app is still available for install
        </p>
      </div>
    </div>
  );
}
