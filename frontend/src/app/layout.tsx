import "./globals.css";
import StoreProvider from "@/store/provider";
import ThemeRegistry from "./ThemeRegistry";
import { createMetadata } from "@/lib/metadata";

export const metadata = {
  ...createMetadata("Tickets Training", "Tickets Training Application"),
  icons: {
    icon: "/images/logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
