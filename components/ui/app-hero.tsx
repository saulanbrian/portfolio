import Image from "next/image";

export interface AppHeroConfig {
  logo: string;
  logoAlt: string;
  name: string;
  description: string;
  features: string[];
  downloadUrl?: string;
}

export function AppHero({ config }: { config: AppHeroConfig }) {
  return (
    <div className="flex flex-col md:w-[30%] md:shrink-0">
      {/* Logo + Title inline */}
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border">
          <Image
            src={config.logo}
            alt={config.logoAlt}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {config.name}
        </h1>
      </div>

      {/* Description */}
      <p className="mt-4 text-foreground-muted">{config.description}</p>

      {/* Feature list */}
      {config.features.length > 0 && (
        <ul className="mt-6 space-y-2 text-sm text-foreground-muted">
          {config.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-primary">✓</span> {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Download button */}
      {config.downloadUrl && (
        <a
          href={config.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-pill border border-border px-8 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
        >
          Download
        </a>
      )}
    </div>
  );
}