import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata('Login', 'Sign in to your account')

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
