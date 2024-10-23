import HeaderAuth from "@/components/HeaderAuth";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { getUserData } from '@/hooks/getUserData';
import { UserProvider } from '@/context/UserProvider';
import { Analytics } from '@vercel/analytics/react';

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-dmSans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "genspoai",
  description: "Generate infinite outfit ideas, interior design concepts, home decor inspo, and style inspiration with AI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();

  return (
      <html lang="en" suppressHydrationWarning>
        <body className="bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider initialData={userData}>
              <main className={dmSans.className}>
                <div className="w-screen h-screen flex flex-col items-center">
                  <div className="flex-1 w-full h-full flex flex-col items-center">
                    <nav className="z-50 px-4 flex flex-row justify-between items-center bg-white absolute top-0 w-screen border-b border-b-foreground/10 h-16">
                        <div className='font-medium text-xl items-center font-semibold'>
                          <Link href={"/"} className="flex flex-row">
                            <div>
                              genspo
                            </div>
                            <div className="text-primary">
                                ai
                            </div>
                          </Link>
                        </div>
                        <HeaderAuth />
                    </nav>
                    <div className="h-full w-full">
                      {children}
                    </div>
                  </div>
                </div>
              </main>
            </UserProvider>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
  );
}