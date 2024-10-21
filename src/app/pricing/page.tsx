"use client"

import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";

export default function Pricing() {
  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="max-w-lg w-full flex flex-col space-y-4 items-center">
          <h1 className="text-2xl font-semibold pb-4">Upgrade to try beta</h1>
          <Card className="p-6 rounded-md">
            <h2 className="text-blue-300 text-xl font-medium">Genspo Plus</h2>
            <p className="mt-2 text-6xl pb-2">$20 <span className="text-base opacity-60">USD/month</span></p>
            <p className="text-sm text-neutral-400 pb-4">
              Unlock the full potential of AI-generated inspiration
            </p>
            <SubscribeButton />
            <div className="flex flex-col my-4 space-y-2 text-sm">
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Unlimited AI image generations</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Access to curated visual collections</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Save, organize, and share boards with collaborators</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Higher resolution downloads for design use</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Access to Pro-only collections and trends</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Early access to new features</div>
            </div>
            <div className="border-t border-gray-800 pb-4"></div>
            <div className="pt-4 flex flex-col space-y-2 text-center text-xs text-neutral-500">
              <a href="#" className="hover:underline">
                Need help with a billing issue?
              </a>
            </div>
          </Card>
      </div>
    </div>
  );
}