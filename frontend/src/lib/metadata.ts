import { Metadata } from 'next'

interface GenerateMetadataOptions {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'book' | 'profile'
  siteName?: string
}

const defaultSiteName = 'Tickets Training'
const defaultDescription = 'Tickets Training Application'
const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function generateMetadata({
  title,
  description = defaultDescription,
  keywords = [],
  image,
  url,
  type = 'website',
  siteName = defaultSiteName,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const fullUrl = url ? `${defaultUrl}${url}` : defaultUrl

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(defaultUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      type,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
    },
  }
}

// Helper para metadata básica (más simple)
export function createMetadata(
  title: string,
  description?: string
): Metadata {
  return generateMetadata({
    title,
    description,
  })
}
