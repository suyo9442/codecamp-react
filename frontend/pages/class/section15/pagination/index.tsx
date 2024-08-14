import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from "@/src/commons/types/generated/type";
import styled from "@emotion/styled";
import { Fragment, useState } from "react";

const Row = styled.span<{ width?: string }>`
  display: inline-block;
  width: ${({ width }) => width || "auto"};
  border: 1px solid #ddd;
  padding: 4px;
`;
const PaginationStyle = {
  margin: "10px",
  fontSize: "24px",
  cursor: "pointer",
  color: "#868686",
};
const ActiveStyle = {
  ...PaginationStyle,
  fontWeight: "bold",
  color: "#000",
};

export default function PaginationPage() {
  // fetch
  const { data, refetch } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });
  const { data: count } = useQuery<Pick<IQuery, "fetchBoardsCount">, IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT);
  const boardsCount = Number(count?.fetchBoardsCount);
  console.log(boardsCount);

  // pagination
  const [startPage, setStartPage] = useState(1);
  const onNavigatePage = (mode: string): void => {
    console.log(startPage);
    if (mode === "prev") {
      if (startPage === 1) return;
      setStartPage((prev) => prev - 10);
      void onRefetchBoard(startPage - 10);
    } else if (mode === "next") {
      if (startPage + 10 >= boardsCount) return;
      setStartPage((prev) => prev + 10);
      void onRefetchBoard(startPage + 10);
    }
  };

  // re-fetch
  const [currPage, setCurrPage] = useState(1);
  const onRefetchBoard = (page: number): void => {
    refetch({ page: page });
    setCurrPage(page);
  };

  return (
    <>
      {data?.fetchBoards.map((list) => (
        <div key={list._id}>
          <Row width="100px">{list.writer}</Row>
          <Row width="400px">{list.title}</Row>
          <Row width="300px">{list.createdAt}</Row>
        </div>
      ))}

      <span style={PaginationStyle} onClick={() => onNavigatePage("prev")}>
        {"<"}
      </span>
      {new Array(10).fill(0).map(
        (_, idx) =>
          idx + startPage <= boardsCount && (
            <span key={idx} style={idx + startPage === currPage ? ActiveStyle : PaginationStyle} onClick={() => onRefetchBoard(idx + startPage)}>
              {idx + startPage}
            </span>
          )
      )}
      <span style={PaginationStyle} onClick={() => onNavigatePage("next")}>
        {">"}
      </span>
    </>
  );
}
