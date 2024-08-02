import {ButtonArrow,Paginations} from "@/src/components/units/board/list/BoardList.styles";
import {useState} from "react";

interface IPaginationProps {
    boardCount: number;
    refetch: (page: {page: number}) => void
}

const ActiveStyle = {
    color: "#000",
    fontWeight: "bold"
}

export default function Pagination(props: IPaginationProps): JSX.Element {
    const [startPage, setStartPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);

    const onNavigatePage = (mode: string): void => {
      if(mode === 'prev') {
          if(startPage === 1) return;
          setStartPage(prev => prev - 10)

          setCurrPage(startPage - 10)
          props.refetch({ page: startPage + 10 });
      } else if(mode === 'next') {
          if(startPage + 10 >= props.boardCount) return;
          setStartPage(prev => prev + 10)

          setCurrPage(startPage + 10)
          props.refetch({ page: startPage + 10 });
      }
    }
    const onPaginate = (page: number): void => {
        void props.refetch({ page });
        setCurrPage(page)
    }

    return (
        <>
        <ButtonArrow
          arrow="left"
          onClick={() => onNavigatePage("prev")}
        />
        <Paginations>
          {
              new Array(10).fill(0).map((_,idx) => (
                  idx + startPage <= props.boardCount &&
                  <span
                    key={idx + 1}
                    onClick={() => onPaginate(idx + startPage)}
                  >
                    <button style={idx + startPage === currPage ? ActiveStyle : {}}>
                      {idx + startPage}
                    </button>
                  </span>
              ))
          }
        </Paginations>
        <ButtonArrow
          arrow="right"
          onClick={() => onNavigatePage("next")}
        />
        </>
    )
}
