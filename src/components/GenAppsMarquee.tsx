import { Marquee } from "@/components/magicui/marquee";
import { GenAppCard } from "@/components/GenAppCard";
import { genApps } from "@/data/modelData";

export function GenAppsMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {genApps.map((genApp) => (
          <GenAppCard key={genApp.id} genApp={genApp} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {genApps.map((genApp) => (
          <GenAppCard key={genApp.id} genApp={genApp} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}