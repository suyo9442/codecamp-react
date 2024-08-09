import React from "react";
import { type ICommentListUIProps } from "@/src/components/units/board/comment/BoardComment.types";
import InfiniteScroll from "react-infinite-scroller";
import CommentListItemUI from "@/src/components/units/board/comment/list/CommentListItem.presenter";

export default function CommentListUI(props: ICommentListUIProps): JSX.Element {
  return (
    <div style={{ height: "700px", overflow: "auto" }}>
      <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true} useWindow={false}>
        <>
          {props.data?.fetchBoardComments?.map((list) => (
            <CommentListItemUI boardId={props.boardId} key={list._id} list={list} onLoadMore={props.onLoadMore} />
          ))}
        </>
      </InfiniteScroll>
    </div>
  );
}
