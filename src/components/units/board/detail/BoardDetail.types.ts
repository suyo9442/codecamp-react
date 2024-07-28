import { IQuery } from "@/src/commons/types/generated/type";

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, "fetchBoard">
  onMoveToBoardList: () => Promise<boolean>
  onMoveToBoardEdit: () => Promise<boolean>
}