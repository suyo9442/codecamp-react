// import '@/styles/reset.css';
import { type AppProps } from 'next/app'; // Next.js의 AppProps 타입 가져오기
import Layout from '@/src/components/commons/layout';
import ApolloSetting from "@/src/components/commons/apollo";
import {Global} from "@emotion/react";
import {globalStyles} from "@/src/components/commons/styles/globalStyles";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ApolloSetting>
            <>
                <Global styles={globalStyles}/>
                <Layout>
                    <Component />
                </Layout>
            </>
        </ApolloSetting>
    )
}

export default MyApp
