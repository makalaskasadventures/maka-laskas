import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from '@/components/SessionProvider';

export const metadata: Metadata = {
  title: "Maka-Laskas Adventures - I Am Because You Are, Together We Explore",
  description: "Discover transformative adventures in East Africa. Explore Uganda, Tanzania, Rwanda, Kenya, Burundi, and DRC with our Ubuntu-inspired travel experiences.",
  keywords: "East Africa travel, Uganda tours, Tanzania safaris, Rwanda gorillas, Kenya adventures, Burundi culture, DRC rainforests, Ubuntu tourism",
  authors: [{ name: "Maka-Laskas Adventures" }],
  openGraph: {
    title: "Maka-Laskas Adventures - Transformative East Africa Travel",
    description: "I Am Because You Are, Together We Explore. Discover healing, connecting, and transformative adventures across East Africa.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SessionProvider>
          <div className="min-h-screen bg-white">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
