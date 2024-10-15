import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

// If loading a variable font, you don't need to specify the font weight
const dmSans = DM_Sans({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "LEO AI",
  description: "Infinite AI generated inspiration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body
      >
        <div  className={spaceGrotesk.className}>
          <div className="h-16 flex items-center px-12 w-screen border-b-2 border-gray-200 justify-between">
            <div className="flex flex-row items-center gap-2 space-x-4">
              <Link className="hover:text-orange-400 text-xl font-bold uppercase" href="/">[mindscape]</Link>
            </div>
            <Button className='text-sm'>Sign Up</Button>
          </div>
        </div>
        {children}
        <div className="px-12 h-12 flex items-center justify-end text-xs text-gray-500 border-t border-gray-200"> 
          Built by dreamers in NYC 🧠 🛌 💭
        </div>
      </body>
    </html>
  );
}

