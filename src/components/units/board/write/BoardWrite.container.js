import {useRouter} from "next/router";
import {useMutation, gql} from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import {useEffect, useState} from "react";
import {CREATE_BOARD, UPDATE_BOARDS} from "./BoardWriter.queries";

export default function BoardWrite(props) {
    const router = useRouter();
    const [createBoard] = useMutation(CREATE_BOARD);
    const [updateBoard] = useMutation(UPDATE_BOARDS);

    const [values, setValues] = useState({
        writer: {value: '', error: '',},
        password: {value: '', error: '',},
        title: {value: '', error: '',},
        description: {value: '', error: '',},
        address1: {value: ''},
        address2: {value: ''},
        address3: {value: ''},
        youtubeUrl: {value: ''},
        picture: [],
        mainType: {value: 'youtube'},
    });
    const [isActive, setIsActive] = useState(true);
    const validKey = ['writer', 'password', 'title', 'description'];

    const onChangeValue = (name, e) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: {
                ...prevValues[name],  // 기존의 값 유지
                value: e.target.value  // value 업데이트
            }
        }));
    }
    const onUploadBoard = async (isEdit) => {
        const checkValid = () => validKey.every(key => values[key]?.value);

        if(isEdit) {
            const myVariables = {}
            if(values.title?.value) myVariables.title = values.title?.value
            if(values.description?.value) myVariables.contents = values.description?.value

            // const isValid = await checkValid();
            // if(isValid) {
                const result = await updateBoard({
                    variables: {
                        updateBoardInput: myVariables,
                        password: values.password.value,
                        boardId: router.query.boardId
                    }
                })
                router.push(`/boards/${result?.data?.updateBoard?._id}`)
            // }
        } else {
            setValues(prevValues => {
                const newValues = { ...prevValues };
                Object.keys(newValues).forEach(key => {
                    if (!newValues[key].value) {
                        newValues[key].error = '내용을 입력해주세요';
                    } else {
                        newValues[key].error = '';  // 값이 있는 경우 오류를 제거합니다.
                    }
                });
                return newValues;
            });
            const isValid = await checkValid();
            if(isValid) {
                const result = await createBoard({
                    variables: {
                        createBoardInput: {
                            writer: values.writer.value,
                            password: values.password.value,
                            title: values.title.value,
                            contents: values.description.value,
                        }
                    }
                })
                router.push(`/boards/${result?.data?.createBoard?._id}`)
            }
        }
    }

    // useEffect(() => {
    //     const isValid = validKey.every(key => values[key]?.value);
    //     setIsActive(isValid);
    // }, [values]);

    return (
        <BoardWriteUI
            data={props.data}
            values={values}
            onChangeValue={onChangeValue}
            onUploadBoard={onUploadBoard}
            isActive={isActive}
            isEdit={props.isEdit}
        />
    )
}
