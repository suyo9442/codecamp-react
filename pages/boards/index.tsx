import BoardList from "@/src/components/units/board/list/BoardList.container";
import { useQuery } from "@apollo/client";
import { type IQuery, type IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import Pagination from "@/src/components/units/commons/Pagination";

export default function BoardListPage(): JSX.Element {
  const { data = undefined, refetch } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });
  const { data: count = undefined } = useQuery(FETCH_BOARDS_COUNT, {
    variables: {
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      search: "",
    },
  });
  const boardCount = Number(count?.fetchBoardsCount);
  if (data === undefined) return <></>;

  return (
    <BoardList data={data}>
      <Pagination boardCount={boardCount} refetch={refetch} />
    </BoardList>
  );
}
