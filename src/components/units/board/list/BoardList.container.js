import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import BoardListUI from "@/src/components/units/board/list/BoardList.presenter";
import {useState} from "react";
import {FETCH_BOARDS, FETCH_BOARDS_COUNT} from "@/src/components/units/board/list/BoardList.queries";

export default function BoardList() {
    // Utils
    const router = useRouter();

    // State
    const [pageNumber, setPageNumber] = useState(1);
    const [srchDate, setSrchDte] = useState({
        startDate: '2024-07-01',
        endDate: '2024-07-31'
    });
    const [pageOrder, setPageOrder] = useState(0);

    // Fetch
    const {data} = useQuery(FETCH_BOARDS, {
        variables: {
            page: pageNumber
        }
    });
    const {data: count} = useQuery(FETCH_BOARDS_COUNT, {
        variables: {
            startDate: "2024-07-01",
            endDate: "2024-07-31",
            search: ""
        }
    })
    const boards = data?.fetchBoards || [];
    const boardsCount = count?.fetchBoardsCount || 0;
    let boardsCountArrLen;

    // Move
    const onMoveToDetailPage = (id) => router.push(`/boards/${id}`);
    const onMoveToNewPage = () => router.push(`/boards/new`);

    // Search
    const onChangeDateInput = () => {}
    const onTest = () => {
        setSrchDte({
            startDate: '',
            endDate: ''
        })
    }

    // Pagination
    const onCalcPagination = (boardsCount, pageOrder) => {
        const repeatNum = boardsCount / 10;
        const remainder = boardsCount % 10;

        const result = [];
        const sample = Array.from({ length: 10 }, (_, index) => index + 1);

        let i = 0;
        while (i < repeatNum) {
            if (i === 0) {
                result.push(sample);
            } else {
                result.push(result[i - 1].map(list => list + 10));
            }
            i++;
        };

        if(Math.floor(repeatNum)) {
            result[result.length - 1]?.splice(remainder)
        } else {
            result[0]?.splice(remainder)
        }

        boardsCountArrLen = Object.keys(result)?.length - 1;

        return result[pageOrder]
    }
    const onPaginateList = (pageNum) => setPageNumber(pageNum);
    const onPaginateNext = (mode) => {
        const onActivePage = (direction) => {
            const activePage = onCalcPagination(boardsCount, pageOrder + direction)[0]
            setPageNumber(activePage)
        }

        if(mode === 'prev') {
            if(pageOrder > 0) {
                setPageOrder(preVal => preVal - 1)
                onActivePage(-1)
            }
        }

        if(mode === 'next') {
            if(pageOrder < boardsCountArrLen) {
                setPageOrder(preVal => preVal + 1)
                onActivePage(+1)
            }
        }
    }

    return (
        <BoardListUI
            boards={boards}
            boardsCount={boardsCount}
            pageNumber={pageNumber}
            srchDate={srchDate}
            pageOrder={pageOrder}
            boardsCountArrLen={boardsCountArrLen}
            onChangeDateInput={onChangeDateInput}
            onMoveToDetailPage={onMoveToDetailPage}
            onMoveToNewPage={onMoveToNewPage}
            onCalcPagination={onCalcPagination}
            onPaginateList={onPaginateList}
            onPaginateNext={onPaginateNext}
        />
    )
}
