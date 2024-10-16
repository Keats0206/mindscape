// pages/dashboard.js
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="absolute top-0 w-screen flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-red-500 w-screen h-screen flex items-center justify-center">
        <div className="flex items-center justify-center bg-blue-500 w-[500px] h-[500px] rounded">
          <ImageIcon size={100} className="opacity-20" />
        </div>
      </div>
      <div className="flex w-[600px] h-12 absolute bottom-10">
        <div className="flex flex-row w-full">
          <Input placeholder="Say something...." className="bg-white w-full" />
          <Button>Create</Button>
        </div>
      </div>
    </div>
  );
}