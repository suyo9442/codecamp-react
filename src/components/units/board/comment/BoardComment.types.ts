import { type IBoardComment } from "@/src/commons/types/generated/type";
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

export interface IBoardCommentProps {
  boardId: string;
}

export interface IBoardCommentUIProps {
  boardId: string;
  comments: IComments[];
  values: IValues;
  stars: number;
  txtLen: number;
  editValue: IEditValue;
  setValues: Dispatch<SetStateAction<IValues>>;
  setStars: (value: ((prevState: number) => number) | number) => void;
  onSetValues: (key: string, e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSetEditValue: (key: "contents" | "stars", value: string | number) => void;
  onCreateBoardComment: () => Promise<void>;
  onShowEditComment: (id: string, obj: IComments) => void;
  onUpdateBoardComment: (id: string) => Promise<void>;
  onDeleteBoardComment: (id: string) => Promise<void>;
  PLACE_HOLDER: string;
  TXT_MAX_LENGTH: number;
}

export interface IValues {
  password: string;
  contents: string;
}
export interface IEditValue {
  contents: string;
  stars: number;
  txtLen: number;
}

export interface IComments extends IBoardComment {
  isEdit: boolean;
  stars: number[];
  txtLen: number;
}
