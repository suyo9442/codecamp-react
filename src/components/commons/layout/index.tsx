import React from 'react';
import {useRouter} from "next/router";
import LayoutHeader from "@/src/components/commons/layout/header";
import LayoutBanner from "@/src/components/commons/layout/banner";
import LayoutSidebar from "@/src/components/commons/layout/navigation";
import LayoutFooter from "@/src/components/commons/layout/footer";

interface ILayoutProps {
    children: JSX.Element
}

export default function MyLayout(props: ILayoutProps): JSX.Element {
    const router = useRouter();
    const hiddenRouter = ["/auth/signIn"]
    const isHiddenRoute = hiddenRouter.includes(router.asPath);

    return (
        <>
            <LayoutHeader />
            {!isHiddenRoute && <LayoutBanner />}
            <LayoutSidebar />
            <div>{props.children}</div>
            <LayoutFooter />
        </>
    )
}
