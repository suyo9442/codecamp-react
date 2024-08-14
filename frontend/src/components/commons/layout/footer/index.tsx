import React from "react";
import { Layout } from 'antd';
const { Footer } = Layout;

export default function LayoutFooter(): JSX.Element {

    return (
        <Footer style={{ textAlign: 'center' }}>
            &copy; 2024 Kim Soo. All Rights Reserved.
        </Footer>
    )
}
