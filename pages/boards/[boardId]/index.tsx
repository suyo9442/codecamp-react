import BoardDetail from "@/src/components/units/board/detail/BoardDetail.container";
import BoardComment from "@/src/components/units/board/comment/BoardComment.container";
import { useRouter } from "next/router";

export default function BoardDetailPage(): JSX.Element {
  const router = useRouter();
  const { boardId = "" } = router.query;

  return (
    <>
      <BoardDetail />
      <BoardComment boardId={boardId} />
    </>
  );
}
