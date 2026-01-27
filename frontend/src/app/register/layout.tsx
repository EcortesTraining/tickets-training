import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Register",
  "Create a new account to get started"
);

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
