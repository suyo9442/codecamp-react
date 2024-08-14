import BoardList from "@/src/components/units/board/list/BoardList.container";
import { useQuery } from "@apollo/client";
import { type IQuery, type IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import Pagination from "@/src/components/units/commons/Pagination"; import {ChangeEvent, useState} from "react"; import _ from "lodash";

export default function BoardListPage(): JSX.Element {
  const { data, refetch } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });
  const { data: count = undefined, refetch: refetchBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const boardCount = Number(count?.fetchBoardsCount);
  const lastPage = boardCount != null ? Math.ceil(boardCount / 10) : 1;
	
  // Search Title
  const [keyword, setKeyword] = useState("")
  const onMaskingValue = (value: string): string[] => value.replaceAll(keyword, `^^^${keyword}^^^`).split("^^^")
		
  // Search Date
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [srchDate, setSrchDte] = useState({
  //     startDate: "2024-07-01",
  //     endDate: "2024-07-31",
  //   });
  // const onChangeDateInput = (): void => {};

  return (
    <BoardList
      data={data}
      refetch={refetch}
      refetchBoardsCount={refetchBoardsCount}
      keyword={keyword}
      setKeyword={setKeyword}
      onMaskingValue={onMaskingValue}
    >
      <Pagination boardCount={boardCount} refetch={refetch} lastPage={lastPage} />
    </BoardList>
  );
}
