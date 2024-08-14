import styled from "@emotion/styled";
import { type ICTButtonFilledProps } from "@/src/components/units/board/write/BoardWrite.types";

export const LayoutMargin = styled.div`
  margin-left: 160px;
`
export const EmotionWrap = styled.div`
  margin: 100px auto;
`;
export const EmotionContainer = styled.div`
  padding: 0 86px;
`;
export const TitleSection = styled.div`
  padding: 56px 0;
  display: flex;
  justify-content: center;
  font-size: 3.6rem;
  font-weight: 700;
`;
export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ButtonSection = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
`;
export const ColumnBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
`;
export const RowBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 32px;

  &:first-of-type {
    margin-left: 0;
  }
`;
export const InlineBlockBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24px;

  &:first-of-type {
    margin-top: 0;
  }
`;
export const CTLabel = styled.label`
  font-size: 1.6rem;
  padding: 12px 0;
`;
export const CTInput = styled.input`
  width: ${(props) => props.width ?? "100%"};
  height: 52px;
  font-size: 1.6rem;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--grey-100);

  &::placeholder {
    color: var(--grey-100);
  }
`;
export const CTTextArea = styled.textarea`
  font-size: 1.6rem;
  padding: 12px;
  border: 1px solid var(--grey-100);
  min-height: 480px;
  min-width: 996px;
  resize: none;

  &::placeholder {
    color: var(--grey-100);
  }
`;
export const CTButtonFilled = styled.button<ICTButtonFilledProps>`
  width: ${(props) => props.width ?? "auto"};
  cursor: pointer;
  color: ${(props) => props.color ?? "var(--black)"};
  background: ${(props) => props.bgColor ?? "var(--yellow-100)"};
  opacity: ${(props) => (props.isActive === true ? "1" : "0.5")};
  padding: ${(props) => props.padding ?? "16px 48px"};
  font-size: 1.6rem;
  margin: ${(props) => props.margin ?? "0"};
`;
export const AddImgBox = styled.label`
  width: 78px;
  height: 78px;
  background: var(--grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 24px;
  font-size: 12px;
  cursor:pointer;
  overflow:hidden;
`;
export const AddImgContent = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: var(--grey-100);
  color: var(--grey-200);
  margin-bottom: 6px;
  cursor:pointer;

  /* plus */
  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: var(--grey-200); /* 선 색상 */
  }
  &::before {
    width: 100%;
    height: 2px; /* 수평 선 두께 */
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  &::after {
    width: 2px; /* 수직 선 두께 */
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
`;
export const FileInput = styled.input`
	display: none;
`
export const AddImg = styled.div`
  width: 78px;
  height: 78px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ddd;
  margin-right: 24px;
  position: relative;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  
  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const ImgDeleteBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.6);
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(45deg);
    transition: all 0.2s;
  }

  &::after {
    transform: translateY(-50%) rotate(-45deg);
  }

  &:hover::before,
  &:hover::after {
    background-color: #fff;
  }
`
export const ImgUpdateBtn = styled.button`
	display: inline-block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`
export const RadioBox = styled.div`
  margin-right: 18px;
  display: flex;
  align-items: center;
`;
export const CTRadio = styled.input`
  &[type="radio"] {
    margin-bottom: 7px;
    margin-right: 12px;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 6px;
    transition: border 0.1s ease-in-out;

    &:checked {
      background: var(--yellow-100);
      border: 3px solid #fff; // 라인이 아닌, 라인과 원 사이 색상
      box-shadow: 0 0 0 1px var(--yellow-100); // 라인
    }
`;
export const ValidErrMsg = styled.span`
  font-size: 1.2rem;
  color: var(--disable);
  margin-top: 6px;
`;
