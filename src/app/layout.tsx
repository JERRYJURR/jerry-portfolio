import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ResetWrapper } from "@/components/reset-wrapper";
import siteConfig from "../../site.config.json";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jerry Kou — AI-native product designer",
  description:
    "Senior product designer based in Vancouver. I design, code, and ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Strip any URL hash on initial load so refreshing a deep-link
            (e.g. /#experience) returns to "/" without the anchor jump.
            Runs early in body parse, before the browser scrolls to the
            anchor target. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(window.location.hash){history.replaceState(null,"",window.location.pathname);}',
          }}
        />
        <Navbar
          bookingUrl={siteConfig.bookingUrl}
          resumeUrl={siteConfig.resumeUrl}
        />
        <ResetWrapper>
          {children}
          <Footer
            email={siteConfig.email}
            bookingUrl={siteConfig.bookingUrl}
            resumeUrl={siteConfig.resumeUrl}
            linkedinUrl={siteConfig.linkedinUrl}
            location={siteConfig.location}
          />
        </ResetWrapper>
      </body>
    </html>
  );
}
