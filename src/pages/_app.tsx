import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

import '../styles/globals.scss'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>      
          <title>Pokedex - 3DDY</title>
      </Head>
      <NavBar/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}
export default MyApp
