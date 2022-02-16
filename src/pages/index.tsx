import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['404'])),
    },
  }
}

const HomePage: NextPage = () => {
  return (
    <h1>
      Honey, I&apos;m home
      <div>
        Have a Link <Link href='/posts/testPage'>Link</Link>
        Have a Link{' '}
        <Link href='/posts/testPage' locale='fr'>
          French Link
        </Link>
      </div>
    </h1>
  )
}

export default HomePage
