import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { join } from 'path'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

interface TestProps {
  mdxSource: MDXRemoteSerializeResult
  isCorrectLocale: boolean
  availableLocales: Array<string>
}

interface Query extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentPath = join(process.cwd(), 'content')
  const slugs = readdirSync(contentPath)

  const paths = slugs
    .map(slugName => {
      const locales = readdirSync(join(contentPath, slugName))
      return locales.map(file => {
        return {
          params: {
            slug: slugName,
            locale: file.replace(/\.mdx$/, ''),
          },
        }
      })
    })
    .flat()

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<TestProps, Query> = async ({
  params,
  locale,
  defaultLocale = 'en',
}) => {
  const slug = params?.slug
  if (!slug) {
    return {
      notFound: true,
    }
  }
  const slugPath = join(process.cwd(), 'content', slug)
  const localePath = join(slugPath, `${locale}.mdx`)
  const defaultPath = join(slugPath, `${defaultLocale}.mdx`)
  const isCorrectLocale = existsSync(localePath)

  let mdxSource: MDXRemoteSerializeResult | null = null
  const availableLocales = readdirSync(slugPath).map(file =>
    file.replace(/\.mdx$/, ''),
  )
  if (isCorrectLocale) {
    mdxSource = await serialize(readFileSync(localePath, 'utf-8'))
  } else {
    mdxSource = await serialize(readFileSync(defaultPath, 'utf-8'))
  }

  return {
    props: {
      mdxSource,
      isCorrectLocale,
      availableLocales,
    },
  }
}

const TestPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  isCorrectLocale,
  mdxSource,
  availableLocales,
}) => {
  const router = useRouter()
  console.log(router)
  return (
    <div>
      <MDXRemote {...mdxSource} />
      correct Locale? {isCorrectLocale ? 'yes' : 'no'}
      <p>{availableLocales}</p>
    </div>
  )
}

export default TestPage
