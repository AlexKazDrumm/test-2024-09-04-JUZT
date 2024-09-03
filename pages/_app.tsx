import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../src/context/UserContext';
import { CarProvider } from '../src/context/CarContext';
import Header from '../src/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CarProvider>
        <Header />
        <Component {...pageProps} />
      </CarProvider>
    </UserProvider>
  );
}

export default MyApp;