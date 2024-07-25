import {EmotionWrap} from "@/src/components/units/board/write/BoardWriter.styles";
import {
    InputSec,
    Stars,
    Title,
    CommentBox,
    Avatar,
    CommentContent,
    UserInfo,
    Contents,
    CreatedAt,
    ActionButtons,
    InputBox,
    TextArea,
    SubmitBtn,
    TextLen
} from "@/src/components/units/board/comment/BoardComment.styles"
import StarIcon from "@/src/components/commons/StarIcon";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useState} from "react";
import CommentDeleteBtn from "@/src/components/commons/CommentDeleteBtn";
import CommentEditBtn from "@/src/components/commons/CommentEditBtn";

const CREATE_BOARD_COMMENT = gql`
    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
        createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
            _id
        }
    }
`

const FETCH_BOARD_COMMENTS = gql`
    query fetchBoardComments($page: Int, $boardId: ID!) {
        fetchBoardComments(page: $page, boardId: $boardId) {
            _id
            writer
            contents
            rating
            user {
                _id
                email
                name
                picture
                createdAt
                updatedAt
                deletedAt
            }
            createdAt
        }
    }
`

const deleteBoardComment = gql``

const PLACE_HOLDER = '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
export default function BoardCommentUI(props) {
    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            page: 1,
            boardId: props.boardId
        },
        skip: !props.boardId
    })
    const comments = data?.fetchBoardComments


    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT, {
        refetchQueries: [
            {
                query: FETCH_BOARD_COMMENTS,
                variables: {
                    page: 1,
                    boardId: props.boardId,
                }
            }, // 리페치할 쿼리와 변수
        ],
    });
    const [stars, setStars] = useState([0, 0, 0, 0, 0])
    const [values, setValues] = useState({
        writer: 'effy',
        password: '1234',
        contents: '',
        rating: 2,
    })

    const onSetStars = (idx) => {
        const newStars = stars.map((value, i) => i <= idx ? 1 : 0);
        setStars(newStars); // 상태 업데이트
    }
    const onSetValues = (key, e) => {
        setValues({
            ...values,
            [key]: e.target.value
        })
    }
    const onCreateBoardComment = async () => {
        try {
            const password = prompt('비밀번호를 입력해주세요.')
            if(!password) return;

            const starActiveArr = stars.filter(star => star);
            const rating = starActiveArr.length
            const {writer, contents} = values;

            const result = await createBoardComment({
                variables: {
                    boardId: props.boardId,
                    createBoardCommentInput: {
                        writer,
                        password,
                        contents,
                        rating,
                    }
                }
            });

            const {_id} = result.data.createBoardComment
            if(_id) {
                alert('댓글이 등록되었습니다.')
            } else {
                alert('댓글 등록에 실패하였습니다.')
            }


        } catch (err) {
            console.error(err)
        }
    }






    return (
        <EmotionWrap isShadow={false}>
            <>
                <Title>
                    <img src='/images/comment.svg' />
                    댓글
                </Title>
                <InputSec>
                    <Stars>
                        {
                            stars.map((star, idx) =>
                                <button key={idx} onClick={() => onSetStars(idx)} >
                                    <StarIcon fill={star}/>
                                </button>
                            )
                        }
                    </Stars>
                    <InputBox>
                        <TextArea placeholder={PLACE_HOLDER} onChange={e => onSetValues('contents', e)}/>
                        <TextLen>0/100</TextLen>
                        <SubmitBtn onClick={onCreateBoardComment}>등록하기</SubmitBtn>
                    </InputBox>
                </InputSec>
                <>
                    {
                        comments?.map(list =>
                            <CommentBox key={list._id}>
                                <Avatar>
                                    <img src='/images/avatar.png' alt='avatar' />
                                </Avatar>
                                <CommentContent>
                                    <UserInfo>
                                        <span>{list.writer}</span>
                                        <span>
                                            {[...Array(Math.floor(list.rating))].map((_, index) => (
                                                <StarIcon key={index} fill={true} />
                                            ))}
                                            {[...Array(5-Math.floor(list.rating))].map((_, index) => (
                                                <StarIcon key={index} />
                                            ))}
                                        </span>
                                    </UserInfo>
                                    <Contents>
                                        {list.contents}
                                    </Contents>
                                    <CreatedAt>
                                        {list.createdAt}
                                    </CreatedAt>
                                </CommentContent>
                                <ActionButtons>
                                    <CommentEditBtn />
                                    <CommentDeleteBtn />
                                </ActionButtons>
                            </CommentBox>
                        )
                    }
                </>
            </>
        </EmotionWrap>
    )
};
