import {gql, useQuery } from "@apollo/client";
import { IQuery, IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";
import styled from "@emotion/styled";
// import { FETCH_BOARDS } from "@/src/components/units/board/list/BoardList.queries";

export const FETCH_BOARDS = gql`
    query fetchBoards {
        fetchBoards {
            _id
            writer
            title
            contents
        }
    }
`

const Row = styled.span<{ width?: string }>`
  display: inline-block;
  width: ${({ width }) => width || "auto"};
  border: 1px solid #ddd;
  padding: 4px;
`;

export default function FetchPolicyComponent() {
  // fetch
  const { data } = useQuery<Pick<IQuery, "fetchBoards">,  IQueryFetchBoardsArgs>(FETCH_BOARDS, {
		fetchPolicy: "cache-first"
  });
	
  return (
    <div style={{ height: "700px", overflow: "auto", outline: "3px solid #000" }}>
			{
        data?.fetchBoards.map((list) => (
          <div key={list._id}>
            <Row width="100px">{list.writer}</Row>
            <Row width="400px">{list.title}</Row>
            <Row width="300px">{list.createdAt}</Row>
          </div>
        ))
			}
    </div>
  );
}
