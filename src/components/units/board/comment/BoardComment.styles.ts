import styled from "@emotion/styled";

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 32px;
  border-top: 1px solid var(--grey-100);
`;
export const InputSec = styled.div`
  width: 100%;
  padding: 24px 0;
`;
export const Stars = styled.div`
  padding: 12px 0;
`;
export const InputBox = styled.div`
  width: 100%;
  height: 161px;
  position: relative;
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 161px;
  border: 1px solid var(--grey-100);
  color: var(--grey-200);
  padding: 24px;
  
  &::placeholder {
    color: var(--grey-100);
  }
`;
export const TextLen = styled.button`
  color: var(--grey-100);
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 24px;
`;
export const SubmitBtn = styled.button<{ isEdit?: boolean }>`
  height: 52px;
  background: ${(props) => (props.isEdit === true ? "var(--yellow-100)" : "var(--black)")};
  color: ${(props) => (props.isEdit === true ? "var(--black)" : "var(--white)")};
  padding: 14px 16px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--grey-100);
  padding: 24px 0;
`;
export const Avatar = styled.div`
  flex: 1;
  img {
    width: 40px;
    height: 40px;
  }
`;
export const CommentContent = styled.div`
  flex: 22;
`;
export const ActionButtons = styled.div`
  flex: 2;
  text-align: right;
  
  > button {
    padding: 8px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  > span:last-of-type {
    margin-left: 16px;
  }
`;
export const Contents = styled.div`
  color: var(--grey-200);
  margin-bottom: 24px;
`;
export const CreatedAt = styled.div`
  font-size: 12px;
  color: var(--grey-100);
`;
