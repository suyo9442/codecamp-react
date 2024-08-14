import {css} from "@emotion/react";

export const globalStyles = css`
    :root {
        --main: #FF7C83;
        --black: #000;
        --white: #fff;
        --disable: #F44336;
        --grey-100: #BDBDBD;
        --grey-200: #4F4F4F;
        --grey-300: #F2F2F2;
        --yellow-100: #FFD600;
    }
    @font-face {
        font-family: "myfont";
        src: url("/fonts/scifibit.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html, body {
        font-size: 62.5%;
        font-weight: 500;
    }
    button {
        border: none;
    }
    em {
        font-style: normal;
    }
    div, span, em, p, button, input, textarea {
        font-size: 1.6rem;
    }
    ul>li,ol>li {
        list-style: none;
    }
    button {
        background: none;
        cursor: pointer;
    }
    input, textarea {
        border: none;
    }
`
