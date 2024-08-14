import BoardWrite from "@/src/components/units/board/write/BoardWrite.container";
import { useQuery } from "@apollo/client";
import { FETCH_BOARD } from "@/src/components/units/board/detail/BoardDetail.quries";
import { useRouter } from "next/router";
import { type IQuery, type IQueryFetchBoardArgs } from "@/src/commons/types/generated/type";

export default function BoardEditPage(): JSX.Element {
  const router = useRouter();
  const boardId = router.query?.boardId as string;
	
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: {
      boardId,
    },
    skip: boardId === undefined,
  });

  return <BoardWrite isEdit={true} data={data} />;
}
