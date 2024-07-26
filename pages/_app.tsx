import '@/styles/reset.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/app'; // Next.js의 AppProps 타입 가져오기

function MyApp({ Component, pageProps }: AppProps) {
    const client = new ApolloClient({
        // uri: "http://backend09.codebootcamp.co.kr/graphql",
        uri: "http://backend-practice.codebootcamp.co.kr/graphql",
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
