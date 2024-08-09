import { type IQuery } from "@/src/commons/types/generated/type";
import { type ChangeEvent } from "react";

// BoardList.presenter
export interface ISrchDate {
  startDate: string;
  endDate: string;
}

export interface IBoardListUIProps {
  data: Pick<IQuery, "fetchBoards">;
  srchDate: ISrchDate;
  onChangeDateInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onMoveToDetailPage: (id: string) => Promise<boolean>;
  onMoveToNewPage: () => Promise<boolean>;
  children: JSX.Element;
}
