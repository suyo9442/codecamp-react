import { type IQuery } from "@/src/commons/types/generated/type";
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

// BoardList.presenter
export interface ISrchDate {
  startDate: string;
  endDate: string;
}

export interface IBoardListUIProps {
  data: Pick<IQuery, "fetchBoards">;
  count: Pick<IQuery, "fetchBoardsCount">;
  pageNumber: number;
  srchDate: ISrchDate;
  pageOrder: number;
  boardsCountArrLen: number;
  onChangeDateInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onMoveToDetailPage: (id: string) => Promise<boolean>;
  onMoveToNewPage: () => Promise<boolean>;
  onCalcPagination: (count: number, pageOrder: number) => number[];
  setPageNumber: Dispatch<SetStateAction<number>>;
  onPaginateNext: (mode: string) => void;
}
