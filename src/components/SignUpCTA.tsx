import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageCloud, ImageItem } from "@/components/ui/image-cloud";

const images: ImageItem[] = [
  { src: "/generation_1.png", alt: "generation_1" },
  { src: "/generation_2.png", alt: "generation_2" },
  { src: "/generation_3.png", alt: "generation_3" },
  { src: "/generation_4.png", alt: "generation_4" },
  { src: "/generation_5.png", alt: "generation_5" },
  { src: "/generation_6.png", alt: "generation_6" },
  { src: "/generation_7.png", alt: "generation_7" },
  { src: "/generation_8.png", alt: "generation_8" }
]

const SignUpCTA = () => {
  return (
    <div className="z-20 bg-transparent relative w-full h-96 flex flex-row justify-center items-center">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="text-4xl font-bold">Create Your Own Inspiration</div>
        <div className="text-center max-w-2xl text-xl text-gray-500">
          GenspoAI is an visual inspiration engine - start creating your own world of ideas.
        </div>
        <Link href="/signup">
          <Button size="lg" className="z-20">Sign Up</Button>
        </Link>
      </div>
      <div className="-z-20 flex items-center justify-center top-0 left-0 absolute w-screen h-96">
        <div className="h-full w-full overflow-hidden">
        <ImageCloud images={images} />
        </div>
      </div>
    </div>
  );
};

export default SignUpCTA;
