import BoardCommentUI from "@/src/components/units/board/comment/BoardComment.presenter";
import { FETCH_BOARD_COMMENTS, CREATE_BOARD_COMMENT, DELETE_BOARD_COMMENT } from "./BoardComment.queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const PLACE_HOLDER = '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
const TXT_MAX_LENGTH = 10

export default function BoardComment(props) {
    // FetchComment
    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            page: 1,
            boardId: props.boardId
        },
        skip: !props.boardId
    })
    const comments = data?.fetchBoardComments

    // Create Comment
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
    })
    const [txtLen, setTxtLen] = useState(0)
    const onSetStars = (idx) => {
        const newStars = stars.map((value, i) => i <= idx ? 1 : 0);
        setStars(newStars); // 상태 업데이트
    }
    const onSetValues = (key, e) => {
        let newValue = e.target.value;

        if (key === 'contents') {
            if (newValue.length > TXT_MAX_LENGTH) {
                newValue = newValue.slice(0, TXT_MAX_LENGTH);
            }
            setTxtLen(newValue.length);
        }

        setValues({
            ...values,
            [key]: newValue
        });
    }
    const onCreateBoardComment = async () => {
        const resetInputData = () => {
            setValues({ ...values, contents: '' })
            setStars([0, 0, 0, 0, 0])
        }

        try {
            const password = prompt('비밀번호를 입력해주세요.')
            if (!password) return;

            const starActiveArr = stars.filter(star => star);
            const rating = starActiveArr.length
            const { writer, contents } = values;

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

            const { _id } = result.data.createBoardComment
            if (_id) {
                alert('댓글이 등록되었습니다.')
                resetInputData()
            } else {
                alert('댓글 등록에 실패하였습니다.')
            }


        } catch (err) {
            console.error(err)
        }
    }

    // Delete Comment
    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT, {
        refetchQueries: [
            {
                query: FETCH_BOARD_COMMENTS,
                variables: {
                    page: 1,
                    boardId: props.boardId,
                }
            }, // 리페치할 쿼리와 변수
        ],
    })
    const onDeleteBoardComment = async (id) => {
        try {
            const password = prompt('비밀번호를 입력하세요.');
            if (!password) return;

            const result = await deleteBoardComment({
                variables: {
                    password,
                    boardCommentId: id
                }
            })
            const { deleteBoardComment: _id } = result.data
            if (_id) {
                console.log('댓글 삭제 성공');
            }
        } catch (err) {
            alert(err.message)
        }
    }

    return <BoardCommentUI
        boardId={props.boardId}
        comments={comments}
        setValues={setValues}
        star={stars}
        onSetStars={onSetStars}
        txtLen={txtLen}
        values={values}
        onSetValues={onSetValues}
        onCreateBoardComment={onCreateBoardComment}
        onDeleteBoardComment={onDeleteBoardComment}
        PLACE_HOLDER={PLACE_HOLDER}
        TXT_MAX_LENGTH={TXT_MAX_LENGTH}
    />;
};
