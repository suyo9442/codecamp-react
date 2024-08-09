import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from "@/src/commons/types/generated/type";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

const Row = styled.span<{ width?: string }>`
  display: inline-block;
  width: ${({ width }) => width || "auto"};
  border: 1px solid #ddd;
  padding: 4px;
`;
export default function PaginationPage() {
  // fetch
  const { data, fetchMore } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS);

  // fetchMore
  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: { page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoards === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        }

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <div style={{ height: "700px", overflow: "auto", outline: "3px solid #000" }}>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true} useWindow={false}>
        {data?.fetchBoards ? (
          data?.fetchBoards.map((list) => (
            <div key={list._id}>
              <Row width="100px">{list.writer}</Row>
              <Row width="400px">{list.title}</Row>
              <Row width="300px">{list.createdAt}</Row>
            </div>
          ))
        ) : (
          <></>
        )}
      </InfiniteScroll>
    </div>
  );
}
