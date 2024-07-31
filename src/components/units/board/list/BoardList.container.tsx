import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import BoardListUI from "@/src/components/units/board/list/BoardList.presenter";
import { useState } from "react";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import { type IQuery, type IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";

export default function BoardList(): JSX.Element {
  // Utils
  const router = useRouter();

  // State
  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [srchDate, setSrchDte] = useState({
    startDate: "2024-07-01",
    endDate: "2024-07-31",
  });
  const [pageOrder, setPageOrder] = useState(0);

  // Fetch
  const { data = undefined } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS, {
    variables: {
      page: pageNumber,
    },
  });
  const { data: count = undefined } = useQuery(FETCH_BOARDS_COUNT, {
    variables: {
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      search: "",
    },
  });
  let boardsCountArrLen: number = 0;

  // Move
  const onMoveToDetailPage = (id: string): Promise<boolean> => router.push(`/boards/${id}`);
  const onMoveToNewPage = (): Promise<boolean> => router.push(`/boards/new`);

  // Search
  const onChangeDateInput = (): void => {};
  // const onTest = () => {
  //   setSrchDte({
  //     startDate: "",
  //     endDate: "",
  //   });
  // };

  // Pagination
  const onCalcPagination = (boardsCount: number, pageOrder: number): number[] => {
    const repeatNum = boardsCount / 10;
    const remainder = boardsCount % 10;

    const result: number[][] = [];
    const sample: number[] = Array.from({ length: 10 }, (_, index) => index + 1);

    // 페이지네이션 목록 생성
    let i = 0;
    while (i < repeatNum) {
      if (i === 0) {
        result.push(sample);
      } else {
        result.push(result[i - 1].map((list: number) => list + 10));
      }
      i++;
    }

    // 나머지 페이지 처리
    if (Math.floor(repeatNum) !== 0) {
      result[result.length - 1]?.splice(remainder);
    } else {
      result[0]?.splice(remainder);
    }

    boardsCountArrLen = Object.keys(result)?.length - 1;

    return result[pageOrder];
  };
  // const onPaginateList = (pageNum: number) => setPageNumber(pageNum);
  const onPaginateNext = (mode: string): void => {
    const onActivePage = (direction: number): void => {
      const activePage = onCalcPagination(count, pageOrder + direction)[0];
      setPageNumber(activePage);
    };

    if (mode === "prev") {
      if (pageOrder > 0) {
        setPageOrder((preVal) => preVal - 1);
        onActivePage(-1);
      }
    }

    if (mode === "next") {
      if (pageOrder < boardsCountArrLen) {
        setPageOrder((preVal) => preVal + 1);
        onActivePage(+1);
      }
    }
  };

  return (
    <BoardListUI
      data={data}
      count={count}
      pageNumber={pageNumber}
      srchDate={srchDate}
      pageOrder={pageOrder}
      boardsCountArrLen={boardsCountArrLen}
      onChangeDateInput={onChangeDateInput}
      onMoveToDetailPage={onMoveToDetailPage}
      onMoveToNewPage={onMoveToNewPage}
      onCalcPagination={onCalcPagination}
      setPageNumber={setPageNumber}
      onPaginateNext={onPaginateNext}
    />
  );
}
