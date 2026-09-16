import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/#apps"
      className="mb-8 inline-flex items-center text-sm text-foreground-muted transition-colors hover:text-primary"
    >
      ← Back to Apps
    </Link>
  );
}
