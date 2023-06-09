import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome to tetris app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
          </div>
        </div>

        <Link
            href="/play"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Welcome <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Begin the Tetris game
            </p>
          </Link>

        <div className={styles.grid}>
        </div>
      </main>
    </>
  )
}
