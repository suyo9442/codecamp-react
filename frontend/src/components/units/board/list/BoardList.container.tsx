import { useRouter } from "next/router";
import BoardListUI from "@/src/components/units/board/list/BoardList.presenter";
import {IBoardListProps} from "@/src/components/units/board/list/BoardList.types";

export default function BoardList(props: IBoardListProps): JSX.Element {
  // Utils
  const router = useRouter();

  // Move
  const onMoveToDetailPage = (id: string): Promise<boolean> => router.push(`/boards/${id}`);
  const onMoveToNewPage = (): Promise<boolean> => router.push(`/boards/new`);
	
  return (
    <BoardListUI
      data={props.data}
      onMoveToDetailPage={onMoveToDetailPage}
      onMoveToNewPage={onMoveToNewPage}
      refetch={props.refetch}
      refetchBoardsCount={props.refetchBoardsCount}
      keyword={props.keyword}
      setKeyword={props.setKeyword}
      onMaskingValue={props.onMaskingValue}
    >
        {props.children}
    </BoardListUI>
  );
}
