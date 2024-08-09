import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_BOARD } from "@/src/components/units/board/detail/BoardDetail.quries";
import BoardDetailUI from "@/src/components/units/board/detail/BoardDetail.presenter";
import { type IQuery, type IQueryFetchBoardArgs } from "@/src/commons/types/generated/type";

export default function BoardDetail(): JSX.Element {
  const router = useRouter();
  const boardId = router.query?.boardId;
  if (typeof boardId !== "string") return <></>;

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: { boardId },
    skip: Boolean(boardId === ""),
  });

  // Move
  const onMoveToBoardList = (): Promise<boolean> => router.push("/boards");
  const onMoveToBoardEdit = (): void => {
    const _id = data?.fetchBoard._id ?? "";
    if (_id === "") return;

    void router.push(`/boards/${_id}/edit`);
  };

  return <BoardDetailUI data={data} onMoveToBoardList={onMoveToBoardList} onMoveToBoardEdit={onMoveToBoardEdit} />;
}
