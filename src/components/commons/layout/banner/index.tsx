import {Carousel} from "antd";
import React from "react";
import styled from "@emotion/styled";

const SlideWrap = styled(Carousel)`
    margin-top: 50px;
    margin-left: 160px;
`
const SlideImgBox = styled.div`
    height: 400px;
    overflow: hidden;

> img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export default function LayoutBanner(): JSX.Element {
    return (
        <SlideWrap
            autoplay
            draggable
            arrows
            infinite={true}
        >
            <SlideImgBox>
                <img src="/images/banner01.png"/>
            </SlideImgBox>
        </SlideWrap>
    )
}
