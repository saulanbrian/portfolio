import Image from "next/image";

export interface AppHeroConfig {
  logo: string;
  logoAlt: string;
  name: string;
  description: string;
  features: string[];
}

export function AppHero({ config }: { config: AppHeroConfig }) {
  return (
    <div className="flex flex-col md:w-[30%] md:shrink-0">
      {/* Logo + Title inline */}
      <div className="flex items-center gap-3">
        <Image
          src={config.logo}
          alt={config.logoAlt}
          width={64}
          height={64}
          className="rounded-xl"
        />
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
    </div>
  );
}
