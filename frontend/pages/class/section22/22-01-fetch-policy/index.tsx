import {gql, useQuery } from "@apollo/client";
import { IQuery, IQueryFetchBoardsArgs } from "@/src/commons/types/generated/type";
import {useState} from "react";
import FetchPolicyComponent from "@/src/components/units/class/22-fetch-policy"; import {useRouter} from "next/router";
// import {FETCH_BOARDS} from "@/src/components/units/board/list/BoardList.queries";

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

export default function FetchPolicyPage() {
  // fetch
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS);
	const [isVisible, setIsVisible] = useState(false);
	
	const router = useRouter();
	const onMoveToMovedPage = () => router.push('/class/section22/22-01-fetch-policy-moved')
	
  return (
    <div>
      <button onClick={() => setIsVisible(true)}>클릭 시 컴포넌트 렌더링</button>
      {isVisible && <FetchPolicyComponent />}
      
      <button onClick={onMoveToMovedPage}>클릭 시 페이지 이동</button>
		</div>
  );
}
