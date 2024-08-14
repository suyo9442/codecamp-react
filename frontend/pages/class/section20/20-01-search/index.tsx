import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/src/components/units/board/list/BoardList.queries";
import { IQuery, IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";
import styled from "@emotion/styled";
import {ChangeEvent, type MouseEvent,useState } from "react";
import _ from 'lodash';

const Row = styled.span<{ width?: string }>`
  display: inline-block;
  width: ${({ width }) => width || "auto"};
  border: 1px solid #ddd;
  padding: 4px;
`;
const Pagination = styled.span`
	margin: 12px;
	cursor:pointer;
`
export default function PaginationPage() {
	// Re-fetch
  const { data, refetch } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS);
	
	// Pagination
	const onClickPage = (e: MouseEvent<HTMLSpanElement>): void => {
		// 검색어 refetch시, 검색어가 저장되기 때문에 search를 추가하지 않아도 됨 !
		void refetch({page: Number(e.currentTarget.id)});
	}
	
	// Search
	const [search, setSearch] = useState("")
	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
		// setSearch(e.currentTarget.value)
		
		// [버튼없이 검색] 방법1 --> ❌ (너무 많은 요청)
		// void refetch({search: e.currentTarget.value, page: 1});
		
		// [버튼없이 검색] 방법2: Debounce --> ⭕️ (입력 없을 시, 일정시간 후 실행)
		void getDebounce(e.currentTarget.value)
		
	}
	const onClickSearch = (): void => void refetch({search, page: 1});
	
	// Debounce
	const getDebounce = _.debounce((value): void => {
		void refetch({search: value, page: 1});
	}, 700)
	
		
  return (
    <div style={{ height: "800px", overflow: "auto", outline: "3px solid #000" }}>
      검색어입력: <input type="text" onChange={onChangeSearch} /> <button onClick={onClickSearch}>검색</button>
      {
        data?.fetchBoards.map((list) => (
          <div key={list._id}>
            <Row width="100px">{list.writer}</Row>
            <Row width="400px">{list.title}</Row>
            <Row width="300px">{list.createdAt}</Row>
          </div>
        ))
      }
			{
				new Array(10).fill(0).map((_, idx) => (
					<Pagination key={idx + 1} id={String(idx + 1)} onClick={onClickPage}>
						{idx + 1}
					</Pagination>
				))
			}
    </div>
  );
}
