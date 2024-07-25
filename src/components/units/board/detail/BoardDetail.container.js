import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {FETCH_BOARD} from "@/src/components/units/board/detail/BoardDetail.quries";
import BoardDetailUI from "@/src/components/units/board/detail/BoardDetail.presenter";

export default function BoardDetail() {
    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD, {variables: { boardId: router.query.boardId },});

    return (
        <BoardDetailUI data={data}/>
    );
}
