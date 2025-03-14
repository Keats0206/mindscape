// import HeaderAuth from "@/components/HeaderAuth";
import { ThemeProvider } from "next-themes";
// import Link from "next/link";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { getCurrentUser } from '@/utils/user';
import { UserProvider } from '@/contexts/UserContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
// import Image from "next/image";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-dmSans",
});

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL 
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "GenspoAI",
  description: "Generate infinite outfit ideas, interior design concepts, home decor inspo, and style inspiration with AI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getCurrentUser();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className + " bg-background text-foreground"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider initialUserData={userData}>
            <main>
              <div className="w-screen flex flex-col items-center">
                <div className="flex-1 w-full h-full flex flex-col items-center">
                  {/* <nav className="z-50 px-4 flex flex-row justify-between items-center bg-white absolute top-0 w-screen h-16">
                    <div className='font-medium text-xl items-center font-semibold'>
                      <Link href={"/"} className="flex flex-row">
                        <div>
                          <Image src={"/logo.png"} alt="logo" width={72} height={24} />
                        </div>
                      </Link>
                    </div>
                    <HeaderAuth />
                  </nav> */}
                  <div className="h-full w-full">
                    {children}
                  </div>
                </div>
              </div>
              {/* <div className="h-12 bg-white w-full flex flex-row justify-center items-center text-xs font-medium text-gray-500">
                <Link href={"/founder-note"} className="hover:underline">Founder Note</Link>
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-2"></div>
                <Link href={"/privacy"} className="hover:underline">Privacy</Link>
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-2"></div>
                <Link href={"/terms"} className="hover:underline">Terms</Link>
              </div> */}
            </main>
          </UserProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}