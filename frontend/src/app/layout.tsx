import './globals.css'
import ThemeRegistry from './ThemeRegistry'
import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata('Tickets Training', 'Tickets Training Application')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
