import { Rate } from "antd";
import React from "react";
import {
  InputBox,
  InputSec,
  StarsSec,
  SubmitBtn,
  TextArea,
  TextLen,
  Title,
  UpdateInfo,
} from "@/src/components/units/board/comment/BoardComment.styles";
import { TXT_MAX_LENGTH, PLACE_HOLDER } from "@/src/components/units/board/comment/Comment.constans";
import { type ICommentWriteUIProps } from "@/src/components/units/board/comment/BoardComment.types";
import CommentDeleteBtn from "@/src/components/units/commons/CommentDeleteBtn";
import { CTInput } from "@/src/components/units/board/write/BoardWriter.styles";

export default function CommentWriteUI(props: ICommentWriteUIProps): JSX.Element {
  const isEdit = props.isEdit === true;

  return (
    <>
      {!isEdit && (
        <Title>
          <img src="/images/comment.svg" alt="comment" />
          댓글
        </Title>
      )}
      <InputSec>
        <StarsSec>
          <Rate onChange={props.setStars} value={props.stars} />
          <UpdateInfo>
            <CTInput
              width="180px"
              defaultValue={props.values.writer !== "" ? props.values.writer : props.list?.writer ?? ""}
              readOnly={isEdit}
            />
            <CTInput width="180px" value={props.values.password} onChange={(e) => props.onSetValues("password", e)} />
            {isEdit && <CommentDeleteBtn onDelete={() => props.setIsEdit?.(false)} />}
          </UpdateInfo>
        </StarsSec>
        <InputBox>
          <TextArea
            placeholder={PLACE_HOLDER}
            onChange={(e) => props.onSetValues("contents", e)}
            value={props.values.contents !== "" ? props.values.contents : props.list?.contents ?? ""}
            maxLength={TXT_MAX_LENGTH}
          />
          <TextLen>{`${props.txtLen} / ${TXT_MAX_LENGTH}`}</TextLen>
          <SubmitBtn
            onClick={isEdit ? () => props.onUpdateBoardComment(props.list?._id ?? "") : props.onCreateBoardComment}
          >
            {isEdit ? "수정하기" : "등록하기"}
          </SubmitBtn>
        </InputBox>
      </InputSec>
    </>
  );
}
