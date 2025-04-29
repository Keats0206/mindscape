/* eslint-disable @next/next/no-img-element */
import { cn } from "@/utils/cn";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
const generation = [
  {
    prompt: "A prompt of a tattoo",
    img: "/generation_8.png",
  },
  {
    prompt: "A prompt of a tattoo",
    img: "/generation_8.png",
  },
  {
    prompt: "A prompt of a tattoo",
    img: "/generation_8.png",
  },
];

const firstRow = generation.slice(0, generation.length / 2);
const secondRow = generation.slice(generation.length / 2);
const thirdRow = generation.slice(0, generation.length / 2);

const GenerationCard = ({
  img,
}: {
  img: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-72 cursor-pointer overflow-hidden rounded-xl border",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <Image width="400" height="400" alt="" src={img} />
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:600px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-50px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((generation) => (
            <GenerationCard key={generation.prompt} {...generation} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((generation) => (
            <GenerationCard key={generation.prompt} {...generation} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((generation) => (
            <GenerationCard key={generation.prompt} {...generation} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
