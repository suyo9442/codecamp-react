import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {FETCH_BOARD} from "@/src/components/units/board/detail/BoardDetail.quries";
import BoardDetailUI from "@/src/components/units/board/detail/BoardDetail.presenter";
import BoardComment from "@/src/components/units/board/comment/BoardComment.container";

export default function BoardDetail() {
    const router = useRouter()
    const { boardId } = router.query;

    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId },
        skip: !boardId
    });

    // Move
    const onMoveToBoardList = () => router.push('/boards');
    const onMoveToBoardEdit = () => router.push(`/boards/${data?.fetchBoard?._id}/edit`);

    return (
        <>
            <BoardDetailUI
                data={data}
                onMoveToBoardList={onMoveToBoardList}
                onMoveToBoardEdit={onMoveToBoardEdit}
            />
            <BoardComment
                boardId={boardId}

            />
        </>
    );
}
