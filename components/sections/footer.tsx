export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm text-foreground-muted">
        <p>&copy; {new Date().getFullYear()} Brian Saulan. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/saulanbrian"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/brian-saulan"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
