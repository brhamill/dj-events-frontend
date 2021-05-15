import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from './Header'
import { Footer } from './Footer'
import { Showcase } from './Showcase'
import { FunctionComponent } from 'react'

import styles from '@/styles/Layout.module.css'

type Props = {
  title?: string
  keywords?: string
  description?: string
}

export const Layout: FunctionComponent<Props> = ({
  title,
  keywords,
  description,
  children,
}) => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
}
