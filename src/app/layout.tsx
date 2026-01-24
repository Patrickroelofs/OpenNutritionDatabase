import "./globals.css";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactQueryClientProvider } from "@/providers/queryClientProvider";
import { ThemeProvider } from "@/providers/themeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ReactQueryClientProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
