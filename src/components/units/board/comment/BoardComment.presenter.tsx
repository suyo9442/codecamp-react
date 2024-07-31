import { EmotionWrap } from "@/src/components/units/board/write/BoardWriter.styles";
import {
  InputSec,
  Title,
  CommentBox,
  Avatar,
  CommentContent,
  UserInfo,
  Contents,
  CreatedAt,
  ActionButtons,
  InputBox,
  TextArea,
  SubmitBtn,
  TextLen,
  Stars,
} from "@/src/components/units/board/comment/BoardComment.styles";
import CommentDeleteBtn from "@/src/components/commons/CommentDeleteBtn";
import CommentEditBtn from "@/src/components/commons/CommentEditBtn";
import { formatCreatedAt } from "@/src/commons/utils/FormatDate";
import { type IBoardCommentUIProps } from "@/src/components/units/board/comment/BoardComment.types";
import { Rate } from "antd";
import React from "react";

export default function BoardCommentUI(props: IBoardCommentUIProps): JSX.Element {
  return (
    <EmotionWrap isShadow={false}>
      <>
        <Title>
          <img src="/images/comment.svg" alt="comment" />
          댓글
        </Title>
        <InputSec>
          <Stars>
            <Rate onChange={props.setStars} value={props.stars} />
          </Stars>
          <InputBox>
            <TextArea
              placeholder={props.PLACE_HOLDER}
              onChange={(e) => props.onSetValues("contents", e)}
              value={props.values.contents}
              maxLength={props.TXT_MAX_LENGTH}
            />
            <TextLen>{`${props.txtLen} / ${props.TXT_MAX_LENGTH}`}</TextLen>
            <SubmitBtn onClick={props.onCreateBoardComment}>등록하기</SubmitBtn>
          </InputBox>
        </InputSec>
        <>
          {props.comments?.map((list) => (
            <CommentBox key={list._id}>
              {list.isEdit ? (
                <>
                  <InputSec>
                    <Rate onChange={(value) => props.onSetEditValue("stars", value)} value={props.editValue.stars} />
                    <InputBox>
                      <TextArea
                        placeholder={props.PLACE_HOLDER}
                        onChange={(e) => props.onSetEditValue("contents", e.target.value)}
                        value={props.editValue.contents}
                        maxLength={props.TXT_MAX_LENGTH}
                      />
                      <TextLen>{`${props.editValue.txtLen} / ${props.TXT_MAX_LENGTH}`}</TextLen>
                      <SubmitBtn onClick={async () => await props.onUpdateBoardComment(list._id)} isEdit={list.isEdit}>
                        수정하기
                      </SubmitBtn>
                    </InputBox>
                  </InputSec>
                </>
              ) : (
                <>
                  <Avatar onClick={() => props.onDeleteBoardComment}>
                    <img src="/images/avatar.png" alt="avatar" />
                  </Avatar>
                  <CommentContent>
                    <UserInfo>
                      <span>{list.writer}</span>
                      <span>{<Rate value={list.rating} />}</span>
                    </UserInfo>
                    <Contents>{list.contents}</Contents>
                    <CreatedAt>{formatCreatedAt(list.createdAt)}</CreatedAt>
                  </CommentContent>
                  <ActionButtons>
                    <CommentEditBtn onEdit={() => props.onShowEditComment(list._id, list)} />
                    <CommentDeleteBtn onDelete={async () => await props.onDeleteBoardComment(list._id)} />
                  </ActionButtons>
                </>
              )}
            </CommentBox>
          ))}
        </>
      </>
    </EmotionWrap>
  );
}
