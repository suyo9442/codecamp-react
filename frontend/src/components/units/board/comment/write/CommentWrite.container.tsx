import { useMutation } from "@apollo/client";
import {
  CREATE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
  UPDATE_BOARD_COMMENT,
} from "@/src/components/units/board/comment/BoardComment.queries";
import { type ChangeEvent, useState } from "react";
import { TXT_MAX_LENGTH } from "@/src/components/units/board/comment/Comment.constans";
import CommentWriteUI from "@/src/components/units/board/comment/write/CommentWrite.presenter";
import { type ICommentWriteProps } from "@/src/components/units/board/comment/BoardComment.types";
import {
  type IMutation,
  type IMutationUpdateBoardCommentArgs,
  type IUpdateBoardCommentInput,
} from "@/src/commons/types/generated/type";

export default function CommentWrite(props: ICommentWriteProps): JSX.Element {
  // useMutation
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT, {
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
  const [updateBoardComment] = useMutation<Pick<IMutation, "updateBoardComment">, IMutationUpdateBoardCommentArgs>(
    UPDATE_BOARD_COMMENT,
    {
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: {
            page: 1,
            boardId: props.boardId,
          },
        }, // 리페치할 쿼리와 변수
      ],
    }
  );

  const [values, setValues] = useState({
    writer: "Test",
    password: "",
    contents: "",
  });
  const [stars, setStars] = useState(3);
  const [txtLen, setTxtLen] = useState(0);
  const onSetValues = (key: string, e: ChangeEvent<HTMLTextAreaElement>): void => {
    let newValue = e.target.value;

    if (key === "contents") {
      if (newValue.length > TXT_MAX_LENGTH) {
        newValue = newValue.slice(0, TXT_MAX_LENGTH);
      }
      setTxtLen(newValue.length);
    }

    setValues({
      ...values,
      [key]: newValue,
    });
  };
  const onCreateBoardComment = async (): Promise<void> => {
    try {
      if (values.password === "") return alert("비밀번호를 입력하세요.");

      const result = await createBoardComment({
        variables: {
          boardId: props.boardId,
          createBoardCommentInput: {
            writer: values.writer,
            password: values.password,
            contents: values.contents,
            rating: stars,
          },
        },
      });

      const { _id = "" } = result.data.createBoardComment;
      if (_id !== "") {
        console.log("댓글이 등록되었습니다.");
        setValues({
          writer: "Test",
          password: "",
          contents: "",
        });
      } else {
        console.log("댓글 등록에 실패하였습니다.");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  // Update Comment
  const onUpdateBoardComment = async (id: string): Promise<void> => {
    try {
      if (id === "") return;
      if (values.password === "") return alert("비밀번호를 입력하세요.");

      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (values.contents !== "") updateBoardCommentInput.contents = values.contents;
      updateBoardCommentInput.rating = stars;

      const result = await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: updateBoardCommentInput.contents,
            rating: updateBoardCommentInput.rating,
          },
          password: values.password,
          boardCommentId: id,
        },
      });

      const { _id } = result?.data?.updateBoardComment;

      if (_id !== "") {
        props.setIsEdit?.(false);
      } else {
        alert("댓글 수정 실패");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <CommentWriteUI
      values={values}
      txtLen={txtLen}
      stars={stars}
      setStars={setStars}
      onSetValues={onSetValues}
      onCreateBoardComment={onCreateBoardComment}
      onUpdateBoardComment={onUpdateBoardComment}
      isEdit={props.isEdit}
      setIsEdit={props.setIsEdit}
      list={props.list}
    />
  );
}
