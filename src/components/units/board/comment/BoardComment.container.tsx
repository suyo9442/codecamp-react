import BoardCommentUI from "@/src/components/units/board/comment/BoardComment.presenter";
import { FETCH_BOARD_COMMENTS, CREATE_BOARD_COMMENT, DELETE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from "./BoardComment.queries";
import { useMutation, useQuery } from "@apollo/client";
import { type ChangeEvent, useEffect, useState } from "react";
import { type IComments, type IBoardCommentProps } from "./BoardComment.types";
import { type IBoardComment, type IMutation, type IMutationUpdateBoardCommentArgs, type IQuery, type IQueryFetchBoardCommentsArgs } from "@/src/commons/types/generated/type";

const PLACE_HOLDER = "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";
const TXT_MAX_LENGTH = 10;

export default function BoardComment(props: IBoardCommentProps): JSX.Element {
  // Fetch Comment
  const { data } = useQuery<Pick<IQuery, "fetchBoardComments">, IQueryFetchBoardCommentsArgs>(FETCH_BOARD_COMMENTS, {
    variables: {
      page: 1,
      boardId: props.boardId,
    },
    skip: Boolean(props.boardId === ""),
  });
  const [comments, setComments] = useState<IComments[]>([]);
  useEffect(() => {
    const fetchComments = data?.fetchBoardComments.map((list: IBoardComment) => ({
      ...list,
      isEdit: false,
      stars: [...Array(5)].map((_, idx) => (idx < list.rating ? 1 : 0)),
      txtLen: list.contents.length,
    }));
    setComments(fetchComments);
  }, [data]);

  // Create Comment
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
  const [values, setValues] = useState({
    password: "1234",
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
    const resetInputData = (): void => {
      setValues({ ...values, contents: "" });
      setStars(0);
    };

    try {
      const password = prompt("비밀번호를 입력해주세요.") ?? "";
      if (password === "") return;

      const result = await createBoardComment({
        variables: {
          boardId: props.boardId,
          createBoardCommentInput: {
            writer: "effy",
            password,
            contents: values.contents,
            rating: stars,
          },
        },
      });

      const { _id = "" } = result.data.createBoardComment;
      if (_id !== "") {
        console.log("댓글이 등록되었습니다.");
        resetInputData();
      } else {
        console.log("댓글 등록에 실패하였습니다.");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

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
  const onDeleteBoardComment = async (id: string): Promise<void> => {
    try {
      const password = prompt("비밀번호를 입력하세요.") ?? "";
      if (password === "") return;

      const result = await deleteBoardComment({
        variables: {
          password,
          boardCommentId: id,
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

  // Update Comment
  const [updateBoardComment] = useMutation<Pick<IMutation, "updateBoardComment">, IMutationUpdateBoardCommentArgs>(UPDATE_BOARD_COMMENT, {
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
  const [editValue, setEditValue] = useState({
    contents: "",
    stars: 0,
    txtLen: 0,
  });
  const onSetEditValue = (key: "contents" | "stars", value: string | number): void => {
    if (key === "contents") {
      if (typeof value === "number") return;

      const trimmedValue = value.length > TXT_MAX_LENGTH ? value.slice(0, TXT_MAX_LENGTH) : value;
      setEditValue((preVal) => ({
        ...preVal,
        contents: trimmedValue,
        txtLen: trimmedValue.length,
      }));
    }

    if (key === "stars") {
      setEditValue((prevVal) => ({
        ...prevVal,
        stars: Number(value), // 원하는 새로운 값
      }));
    }
  };
  const onShowEditComment = (id: string, obj: IComments): void => {
    const onBoundInitialVal = (obj: IComments): void => {
      Object.keys(editValue).forEach((list) => {
        if (list === "contents") {
          setEditValue((preVal) => ({
            ...preVal,
            contents: obj.contents,
            txtLen: obj.contents.length,
          }));
        }

        if (list === "stars") {
          const rating = Math.floor(obj.rating);
          setEditValue((preVal) => ({
            ...preVal,
            stars: rating,
          }));
        }
      });
    };

    // Open Edit Input
    const _comments = comments.map((list) => (list._id === id ? { ...list, isEdit: true } : { ...list, isEdit: false }));
    setComments(_comments);

    // Bounding Initial Value
    onBoundInitialVal(obj);
  };
  const onUpdateBoardComment = async (id: string): Promise<void> => {
    try {
      const password = prompt("비밀번호를 입력하세요.") ?? "";
      if (password === "") return;

      const result = await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: editValue.contents,
            rating: editValue.stars,
          },
          password,
          boardCommentId: id,
        },
      });
      const { _id = "" } = result.data?.updateBoardComment;
      if (_id !== "") {
        console.log("댓글을 업데이트 했습니다.");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <BoardCommentUI
      boardId={props.boardId}
      comments={comments}
      values={values}
      stars={stars}
      txtLen={txtLen}
      editValue={editValue}
      setStars={setStars}
      setValues={setValues}
      onSetValues={onSetValues}
      onSetEditValue={onSetEditValue}
      onCreateBoardComment={onCreateBoardComment}
      onShowEditComment={onShowEditComment}
      onUpdateBoardComment={onUpdateBoardComment}
      onDeleteBoardComment={onDeleteBoardComment}
      PLACE_HOLDER={PLACE_HOLDER}
      TXT_MAX_LENGTH={TXT_MAX_LENGTH}
    />
  );
}
