import BoardCommentUI from "@/src/components/units/board/comment/BoardComment.presenter";
import {
    FETCH_BOARD_COMMENTS,
    CREATE_BOARD_COMMENT,
    DELETE_BOARD_COMMENT,
    UPDATE_BOARD_COMMENT
} from "./BoardComment.queries";
import { useMutation, useQuery } from "@apollo/client";
import {useEffect, useState} from "react";
import {formatCreatedAt} from "@/src/commons/utils/FormatDate";

const PLACE_HOLDER = '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
const TXT_MAX_LENGTH = 10

export default function BoardComment(props) {
    // Fetch Comment
    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            page: 1,
            boardId: props.boardId
        },
        skip: !props.boardId
    });
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (data) {
            const fetchComments = data.fetchBoardComments.map(list => ({
                ...list,
                isEdit: false,
                stars: [...Array(5)].map((_, idx) => idx < list.rating ? 1 : 0),
                txtLen: list.contents.length
            }));
            setComments(fetchComments);
        }
    }, [data]);

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
    })
    const [stars, setStars] = useState([1, 1, 1, 1, 1])
    const [values, setValues] = useState({
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
            const { contents } = values;

            const result = await createBoardComment({
                variables: {
                    boardId: props.boardId,
                    createBoardCommentInput: {
                        writer: 'effy',
                        password,
                        contents,
                        rating,
                    }
                }
            });

            const { _id } = result.data.createBoardComment
            if (_id) {
                console.log('댓글이 등록되었습니다.')
                resetInputData()
            } else {
                console.log('댓글 등록에 실패하였습니다.')
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

    // Update Comment
    const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT, {
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
    const [editValue, setEditValue] = useState({
        contents: '',
        stars: [1, 1, 1, 1, 1],
        txtLen: 0
    })
    const onSetEditValue = (key, value) => {
        if(key === 'contents') {
            const trimmedValue = value.length > TXT_MAX_LENGTH ? value.slice(0, TXT_MAX_LENGTH) : value;
            setEditValue(preVal => ({
                ...preVal,
                contents: trimmedValue,
                txtLen: trimmedValue.length
            }));
        }

        if(key === 'stars') {
            const newStars = [...Array(5)].map((_, idx) => idx <= value ? 1 : 0);
            setEditValue(preVal => ({
                ...preVal,
                stars: newStars
            }));
        }
    }
    const onBoundInitialVal = (obj) => {
        Object.keys(editValue).forEach(list => {
            if(list === 'contents') {
                setEditValue(preVal => ({
                    ...preVal,
                    contents: obj.contents,
                    txtLen: obj.contents.length
                }));
            }

            if(list === 'stars') {
                const rating = Math.floor(obj.rating)
                const newStars = obj.stars.map((value, i) => i < rating ? 1 : 0);
                setEditValue(preVal => ({
                    ...preVal,
                    stars: newStars
                }));
            }
        })
    }
    const onShowEditComment = (id, obj) => {
        // Open Edit Input
        const _comments = comments.map(list => list._id === id ? {...list, isEdit: true} : {...list, isEdit: false})
        setComments(_comments);

        // Bounding Initial Value
        onBoundInitialVal(obj)
    }
    const onUpdateBoardComment = async (id) => {
        try {
            const password = prompt('비밀번호를 입력하세요.');
            if (!password) return;

            const result = await updateBoardComment({
                variables: {
                    updateBoardCommentInput: {
                        contents: editValue.contents,
                        rating: editValue.stars.filter(list => list)?.length
                    },
                    password,
                    boardCommentId: id
                }
            })
            const {_id} = result.data.updateBoardComment;
            if(_id) {
                console.log('댓글을 업데이트 했습니다.')
            }
        } catch (err) {
            alert(err.message)
        }
    }

    return <BoardCommentUI
        boardId={props.boardId}
        comments={comments}
        values={values}
        stars={stars}
        txtLen={txtLen}
        editValue={editValue}
        setValues={setValues}
        onSetStars={onSetStars}
        onSetValues={onSetValues}
        onSetEditValue={onSetEditValue}
        onCreateBoardComment={onCreateBoardComment}
        onShowEditComment={onShowEditComment}
        onUpdateBoardComment={onUpdateBoardComment}
        onDeleteBoardComment={onDeleteBoardComment}
        PLACE_HOLDER={PLACE_HOLDER}
        TXT_MAX_LENGTH={TXT_MAX_LENGTH}
    />;
};
