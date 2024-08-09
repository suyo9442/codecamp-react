import BoardDetail from "@/src/components/units/board/detail/BoardDetail.container";
import { useRouter } from "next/router";
import CommentWrite from "@/src/components/units/board/comment/write/CommentWrite.container";
import CommentList from "@/src/components/units/board/comment/list/CommentList.container";
import { EmotionContainer, EmotionWrap } from "@/src/components/units/board/write/BoardWriter.styles";

export default function BoardDetailPage(): JSX.Element {
  const router = useRouter();
  const boardId = router.query?.boardId;
  if (typeof boardId !== "string") return <></>;

  return (
    <EmotionWrap>
      <EmotionContainer>
        <BoardDetail />
        <CommentWrite boardId={boardId} />
        <CommentList boardId={boardId} />
      </EmotionContainer>
    </EmotionWrap>
  );
}
