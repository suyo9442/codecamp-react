import {
  ActionButtons,
  Avatar,
  CommentBox,
  CommentContent,
  Contents,
  CreatedAt,
  UserInfo,
} from "@/src/components/units/board/comment/BoardComment.styles";
import { Rate } from "antd";
import { formatCreatedAt } from "@/src/commons/utils/FormatDate";
import CommentEditBtn from "@/src/components/units/commons/CommentEditBtn";
import CommentDeleteBtn from "@/src/components/units/commons/CommentDeleteBtn";
import { type ICommentListItemProps } from "@/src/components/units/board/comment/BoardComment.types";
import React, { useState } from "react";
import CommentWrite from "@/src/components/units/board/comment/write/CommentWrite.container";
import { useMutation } from "@apollo/client";
import { DELETE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "@/src/components/units/board/comment/BoardComment.queries";

export default function CommentListItemUI(props: ICommentListItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);

  // Delete Comment
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT, {
    refetchQueries: [
      {
        query: FETCH_BOARD_COMMENTS,
        variables: {
          page: 1,
          boardId: props.boardId,
        },
      }, // 리페치할 쿼리와 변수
    ],
  });
  const onDeleteBoardComment = async (e): Promise<void> => {
    try {
      const password = prompt("비밀번호를 입력하세요.") ?? "";
      if (password === "") return;

      const result = await deleteBoardComment({
        variables: {
          password,
          boardCommentId: e.currentTarget.id,
        },
      });
      const { deleteBoardComment: _id = "" } = result.data;
      if (_id !== "") {
        console.log("댓글 삭제 성공");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <CommentBox key={props.list._id}>
      {isEdit ? (
        <CommentWrite boardId={props.boardId} isEdit={isEdit} setIsEdit={setIsEdit} list={props.list} />
      ) : (
        <>
          <Avatar>
            <img src="/images/avatar.png" alt="avatar" />
          </Avatar>
          <CommentContent>
            <UserInfo>
              <span>{props.list.writer}</span>
              <span>{<Rate value={props.list.rating} disabled={true} />}</span>
            </UserInfo>
            <Contents>{props.list.contents}</Contents>
            <CreatedAt>{formatCreatedAt(props.list.createdAt)}</CreatedAt>
          </CommentContent>
          <ActionButtons>
            <CommentEditBtn onEdit={() => setIsEdit(true)} />
            <CommentDeleteBtn onDelete={onDeleteBoardComment} id={props.list?._id} />
          </ActionButtons>
        </>
      )}
    </CommentBox>
  );
}
