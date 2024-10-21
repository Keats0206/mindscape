import HeaderAuth from "@/components/HeaderAuth";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { getUserData } from '@/hooks/getUserData';
import { UserProvider } from '@/context/UserProvider';

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
                <div className="min-h-screen flex flex-col items-center">
                  <div className="flex-1 w-full flex flex-col items-center">
                    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                        <div className='font-medium uppercase text-xl items-center font-semibold'>
                          <Link href={"/"} className="flex flex-row">
                            <div>
                              Genspo
                            </div>
                            <div className="text-purple-500">
                                AI
                            </div>
                          </Link>
                        </div>
                        <HeaderAuth />
                      </div>
                    </nav>
                    <div>
                      {children}
                    </div>
                  </div>
                </div>
              </main>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}