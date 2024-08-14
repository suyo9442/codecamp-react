import {
  BBDesc,
  BBTitle,
  BestBoardBottom,
  BestBoardsBox,
  BestBoardsSec,
  BestBoardsWrap,
  BestBoardTop,
  BoardsSec,
  BoardTd,
  BoardTh,
  BoardTr,
  ButtonFilled,
  ButtonLike,
  ButtonOutlined,
  Date,
  DateInput,PaginationBox,
  PaginationSec,
  Profile,
  SearchInput,
  SearchSec,
  TableWrap,
  Title,
  Wrap,
} from "@/src/components/units/board/list/BoardList.styles";
import { type IBoardListUIProps } from "@/src/components/units/board/list/BoardList.types";
import {v4 as uuidv4} from 'uuid'; import SearchBar from "@/src/components/units/commons/SearchBar";

export default function BoardListUI(props: IBoardListUIProps): JSX.Element {
  return (
    <Wrap>
      <BestBoardsWrap>
        <Title>베스트 게시글</Title>
        <BestBoardsSec>
          {[1, 2, 3, 4].map((list) => (
            <BestBoardsBox key={list}>
              <BestBoardTop></BestBoardTop>
              <BestBoardBottom>
                <BBTitle>게시물 제목입니다.</BBTitle>
                <BBDesc>
                  <div>
                    <Profile>
                      <img src="/images/avatar.png" alt="" />
                      <em>노원두</em>
                    </Profile>
                    <Date>Date: 2021.02.18</Date>
                  </div>
                  <div>
                    <ButtonLike>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                        />
                      </svg>
                      <em>356</em>
                    </ButtonLike>
                  </div>
                </BBDesc>
              </BestBoardBottom>
            </BestBoardsBox>
          ))}
        </BestBoardsSec>
      </BestBoardsWrap>
      <TableWrap>
        <SearchSec>
          <SearchBar
            setKeyword={props.setKeyword}
            refetch={props.refetch}
            refetchBoardsCount={props.refetchBoardsCount}
          />
        </SearchSec>
        <BoardsSec>
          <thead>
            <BoardTr>
              <BoardTh width="10%">번호</BoardTh>
              <BoardTh width="50%">제목</BoardTh>
              <BoardTh width="30%">작성자</BoardTh>
              <BoardTh width="10%">날짜</BoardTh>
            </BoardTr>
          </thead>
          <tbody>
            {props.data?.fetchBoards?.map((list) => (
              <BoardTr key={list._id} onClick={() => props.onMoveToDetailPage(list._id)}>
                <BoardTd>{list._id.slice(-6)}</BoardTd>
                <BoardTd>
                  {
										props.onMaskingValue?.(list.title).map(list =>
											<em key={uuidv4()} style={{ background: list === props.keyword ? "#ffc4a6" : "none" }}>
												{list}
											</em>
										)
									}
								</BoardTd>
                <BoardTd>{list.writer}</BoardTd>
                <BoardTd>
                  {list.createdAt}
                  {/* 2024.07.01 */}
                </BoardTd>
              </BoardTr>
            ))}
          </tbody>
        </BoardsSec>
        <PaginationSec>
          <PaginationBox>
            {props.children}
          </PaginationBox>
          <ButtonOutlined onClick={props.onMoveToNewPage}>게시물 등록하기</ButtonOutlined>
        </PaginationSec>
      </TableWrap>
    </Wrap>
  );
}
