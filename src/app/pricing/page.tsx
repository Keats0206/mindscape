"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-lg w-full flex flex-col space-y-4 items-center">
          <h1 className="text-2xl font-semibold pb-4">Current Plan</h1>
          <Card className="p-6 rounded-md">
            <h2 className="text-blue-300 text-lg font-medium">Genspo Plus</h2>
            <p className="mt-2 text-6xl pb-2">$20 <span className="text-base opacity-60">USD/month</span></p>
            <p className="text-sm text-neutral-400">
              Unlock the full potential of AI-generated inspiration
            </p>

            <Button size="lg" className="mt-4 w-full bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900">
              Your current plan
            </Button>

            <div className="flex flex-col mt-6 space-y-2 text-sm">
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Unlimited AI image generations</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Access to curated visual collections</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Save, organize, and share boards with collaborators</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Higher resolution downloads for design use</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Access to Pro-only collections and trends</div>
              <div className="flex-row flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Early access to new features</div>
            </div>

            <div className="pt-4 flex flex-col mt-6 space-y-2 text-center text-sm text-neutral-500">
              <a href="#" className="hover:underline">
                Need help with a billing issue?
              </a>
            </div>
          </Card>
      </div>
    </div>
  );
}