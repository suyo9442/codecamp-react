import { FETCH_BOARD_COMMENTS } from "@/src/components/units/board/comment/BoardComment.queries";
import { useQuery } from "@apollo/client";
import { type ICommentListProps } from "@/src/components/units/board/comment/BoardComment.types";
import { type IQuery, type IQueryFetchBoardCommentsArgs } from "@/src/commons/types/generated/type";
import CommentListUI from "@/src/components/units/board/comment/list/CommentList.presenter";

export default function CommentList(props: ICommentListProps): JSX.Element {
  // Fetch Comment
  const { data, fetchMore } = useQuery<Pick<IQuery, "fetchBoardComments">, IQueryFetchBoardCommentsArgs>(
    FETCH_BOARD_COMMENTS,
    {
      variables: {
        page: 1,
        boardId: props.boardId,
      },
      skip: Boolean(props.boardId === ""),
    }
  );
  if (data === undefined) return <></>;
  const onLoadMore = (): void => {
    if (data === undefined || props.boardId === "") return;

    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
        boardId: props.boardId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments === undefined) {
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }

        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
        };
      },
    });
  };

  return <CommentListUI boardId={props.boardId} data={data} onLoadMore={onLoadMore} />;
}
