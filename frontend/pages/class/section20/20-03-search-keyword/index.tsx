import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "@/src/components/units/board/list/BoardList.queries";
import { IQuery, IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";
import styled from "@emotion/styled";
import {ChangeEvent, type MouseEvent,useState } from "react";
import _ from 'lodash';
import {v4 as uuidv4} from "uuid";

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
	const onClickPage = (e: MouseEvent<HTMLSpanElement>): void => void refetch({page: Number(e.currentTarget.id)});
	
	// Search
	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => void getDebounce(e.currentTarget.value)
	
	// Debounce
	const [keyword, setKeyword] = useState("");
	const getDebounce = _.debounce((value): void => {
		void refetch({search: value, page: 1});
    setKeyword(value);
	}, 700)
	
	// 1. 키워드 중심으로 문장 쪼개기 (시크릿코드 사용)
	// 2. 키워드 저장할 state 만들기
	// 3. 분리된 문장 map으로 그리고, list가 키워드와 같다면 마킹
	const onSplitWord = (word: string): string[] => {
		return word.replaceAll(keyword, `^^^${keyword}^^^`).split('^^^');
	}
	
  return (
    <div style={{ height: "800px", overflow: "auto", outline: "3px solid #000" }}>
      검색어입력: <input type="text" onChange={onChangeSearch} />
      {
        data?.fetchBoards.map((list) => (
          <div key={list._id}>
            <Row width="100px">{list.writer}</Row>
            <Row width="400px">
	            {
								onSplitWord(list.title)
								.map(el => (
									<em key={uuidv4()} style={{ background: el === keyword ? "yellow" : "none" }}>
										{el}
									</em>
								))
	            }
						</Row>
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
