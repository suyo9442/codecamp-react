import { IBoardComment } from "@/src/commons/types/generated/type";

// export interface IBoardCommentProps {
//   boardId: number
// }

export interface IEditValue {
  contents: string
  stars: number[]
  txtLen: number
}

export interface IComments extends IBoardComment {
  isEdit: boolean
  stars: number[]
  txtLen: number
}