import { useRouter } from "next/router";
import {useQuery } from "@apollo/client";
import BoardListUI from "@/src/components/units/board/list/BoardList.presenter";
import { useState } from "react";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import { type IQuery, type IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";

interface IBoardListProps {
    data: Pick<IQuery, "fetchBoards">;
    children: JSX.Element;
}

export default function BoardList(props: IBoardListProps): JSX.Element {
  // Utils
  const router = useRouter();

  // State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [srchDate, setSrchDte] = useState({
    startDate: "2024-07-01",
    endDate: "2024-07-31",
  });

  // Move
  const onMoveToDetailPage = (id: string): Promise<boolean> => router.push(`/boards/${id}`);
  const onMoveToNewPage = (): Promise<boolean> => router.push(`/boards/new`);

  // Search
  const onChangeDateInput = (): void => {};

  return (
    <BoardListUI
      data={props.data}
      srchDate={srchDate}
      onChangeDateInput={onChangeDateInput}
      onMoveToDetailPage={onMoveToDetailPage}
      onMoveToNewPage={onMoveToNewPage}
    >
        {props.children}
    </BoardListUI>
  );
}
