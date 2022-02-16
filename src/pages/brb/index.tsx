import { GetStaticProps, NextPage } from 'next'
import { Head } from '~/components/SEO/Head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from './styles.module.scss'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['BRB'])),
    },
  }
}

const BRBPage: NextPage = () => {
  const { t } = useTranslation('BRB')

  const title = t('title')
  const description = t('description')

  return (
    <>
      <Head title={title} description={description} />
      <div className={styles.container}>
        <p className={styles.heading}>{title}</p>
        <p className={styles.paragraph}>{description}</p>
        <p className={styles.paragraph}>{t('socialInvite')}</p>
        <p>
          <a href='https://github.com/lexedwards'>Github</a>{' '}
          <a href='mailto:hello@alexedwards.co'>Email Me</a>
        </p>
      </div>
    </>
  )
}

export default BRBPage
