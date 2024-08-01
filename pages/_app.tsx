import { type AppProps } from 'next/app'; // Next.js의 AppProps 타입 가져오기
import ApolloSetting from "@/src/components/commons/apollo";
import {Global} from "@emotion/react";
import {globalStyles} from "@/src/components/commons/styles/globalStyles";
import {LayoutMargin} from "@/src/components/units/board/write/BoardWriter.styles";
import MyLayout from "@/src/components/commons/layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ApolloSetting>
            <>
                <Global styles={globalStyles}/>
                <MyLayout>
                    <LayoutMargin>
                        <Component />
                    </LayoutMargin>
                </MyLayout>
            </>
        </ApolloSetting>
    )
}

export default MyApp
