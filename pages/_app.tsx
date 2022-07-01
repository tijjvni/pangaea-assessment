import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';       
import store from '../redux/store';           

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
  );
}

export default MyApp
