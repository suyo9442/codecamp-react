import BoardWrite from "@/src/components/units/board/write/BoardWrite.container";
import {useQuery} from "@apollo/client";
import {FETCH_BOARD} from "@/src/components/units/board/detail/BoardDetail.quries";
import {useRouter} from "next/router";

export default function BoardEditPage() {
    const router = useRouter();
    const { boardId } = router.query

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: router.query.boardId,
            skip: !boardId
        }
    });
    console.log(data)

    return (
        <BoardWrite isEdit={true} data={data?.fetchBoard} />
    )
}
