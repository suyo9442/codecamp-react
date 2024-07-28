import { IQuery } from "@/src/commons/types/generated/type";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

// BoardList.presenter
export interface ISrchDate {
    startDate: string
    endDate: string
}

export interface IBoardListUIProps {
    boards: Pick<IQuery, "fetchBoards">
    boardsCount: Pick<IQuery, "fetchBoardsCount">
    pageNumber: number
    srchDate: ISrchDate
    pageOrder: number
    boardsCountArrLen: number
    onChangeDateInput: (e: ChangeEvent<HTMLInputElement>) => void
    onMoveToDetailPage: (id: string) => Promise<boolean> 
    onMoveToNewPage: () => Promise<boolean>
    onCalcPagination: (boardsCount: number, pageOrder: number) => number[]
    setPageNumber: Dispatch<SetStateAction<number>>
    onPaginateNext: (mode: string) => void

}
