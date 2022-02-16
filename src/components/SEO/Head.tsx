import NextHead from 'next/head'
import { useRouter } from 'next/router'

export interface HeadProps {
  children?: React.ReactNode
  description?: string
  image?: string
  title?: string
}

export function Head({ children, description, image, title }: HeadProps) {
  const { locale } = useRouter()
  const baseTitle = 'Alex Edwards'

  return (
    <NextHead>
      <title>{title ? `${title} | ${baseTitle}` : baseTitle}</title>
      <meta
        name='og:title'
        property='og:title'
        content={title ? `${title} | ${baseTitle}` : baseTitle}
      />
      <meta
        name='twitter:title'
        content={title ? `${title} | ${baseTitle}` : baseTitle}
      />

      <meta name='description' content={description} />
      <meta
        name='og:description'
        property='og:description'
        content={description}
      />
      <meta name='twitter:description' content={description} />

      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/favicon.ico' />

      <meta property='og:type' content='website' />
      <meta property='og:locale' content={locale} />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@lexedwards' />
      <meta name='twitter:creator' content='@lexedwards' />

      {
        image ? (
          <>
            <meta property='og:image' content={`${image}`} />
            <meta name='twitter:image' content={`${image}`} />
          </>
        ) : null
        // (
        //   <meta property='og:image' content='/favicon.ico' />
        // )
      }

      <meta
        name='viewport'
        content='width=device-width initial-scale=1 maximum-scale=1'
      />

      {children}
    </NextHead>
  )
}
