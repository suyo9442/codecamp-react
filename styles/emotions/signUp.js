import styled from "@emotion/styled";

export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const SignupInput = styled.input`
    width: 380px;
    height: 52px;
    font-size: 1.6rem;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid var(--grey-100);
    margin-bottom: 12px;
    
    &::placeholder {
    color: var(--grey-100);
    }
`
export const SignUpErrMsg = styled.span`
    font-size: 1.2rem;
    color: var(--disable);
    margin-top: -6px;
    margin-bottom: 12px;
`
