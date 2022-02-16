import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  }
}

const Custom500: NextPage = () => {
  return <h1>500 - Server-side Error occurred</h1>
}

export default Custom500
