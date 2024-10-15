import Link from "next/link";
import { Button } from "./button";

const SignUpCTA = () => {
  return (
    <div className="bg-stone-100 border-t mt-12 space-y-4 h-72 flex flex-col justify-center items-center">
      <div className="text-4xl font-bold">Create Your Own Inspiration</div>
      <div className="text-center max-w-2xl text-xl text-gray-700">
        Mindspace is an visual inspiration powered by AI models which that take text and output images, art and more. 
      </div>
      <Link href="/waitlist">
        <Button size="lg">Sign Up</Button>
      </Link>
    </div>
  );
};

export default SignUpCTA;
