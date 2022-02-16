import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['404'])),
    },
  }
}

const Custom404: NextPage = () => {
  const { t } = useTranslation('404')
  return (
    <h1>
      {t('title')} - {t('description')}
    </h1>
  )
}

export default Custom404
