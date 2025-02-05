import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps:{ session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
