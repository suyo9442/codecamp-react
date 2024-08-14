import { type IBoardComment, type IQuery } from "@/src/commons/types/generated/type";
import type React from "react";
import { type ChangeEvent } from "react";

export interface ICommentWriteProps {
  boardId: string;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  list?: IBoardComment;
}

export interface ICommentWriteUIProps {
  values: IValues;
  txtLen: number;
  stars: number;
  setStars: (value: ((prevState: number) => number) | number) => void;
  onSetValues: (key: string, e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => void;
  onCreateBoardComment: () => Promise<void>;
  onUpdateBoardComment: (id: string) => Promise<void>;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  list: IBoardComment;
}

export interface ICommentListProps {
  boardId: string;
}

export interface ICommentListUIProps {
  boardId: string;
  data: Pick<IQuery, "fetchBoardComments">;
  onLoadMore: () => void;
}

export interface ICommentListItemProps {
  boardId: string;
  list: IBoardComment;
  onLoadMore: () => void;
}

export interface IValues {
  writer: string;
  password: string;
  contents: string;
}

export interface IComments extends IBoardComment {
  txtLen: number;
}
