import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import { useState } from "react";
import { CREATE_BOARD, UPDATE_BOARDS } from "./BoardWriter.queries";
import { type IValues, type IBoardWriteProps, initialState, type ChangeEventHandler } from "@/src/components/units/board/write/BoardWrite.types";
import { type IMutation, type IMutationCreateBoardArgs, type IMutationUpdateBoardArgs } from "@/src/commons/types/generated/type";

const validKey: Array<keyof IValues> = ["writer", "password", "title", "description"];

export default function BoardWrite(props: IBoardWriteProps): JSX.Element {
  const router = useRouter();
  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD);
  const [updateBoard] = useMutation<Pick<IMutation, "updateBoard">, IMutationUpdateBoardArgs>(UPDATE_BOARDS);

  const [values, setValues] = useState<IValues>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isActive, setIsActive] = useState(true);

  const onChangeValue: ChangeEventHandler = (name, e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        value: e.target.value,
      },
    }));
  };
  const onUploadBoard = async (isEdit: boolean) => {
    const checkValid = () => validKey.every((key) => values[key]?.value);

    if (isEdit) {
      interface IMyVariables {
        title?: string;
        contents?: string;
      }
      const myVariables: IMyVariables = {};
      if (values.title?.value) myVariables.title = values.title?.value;
      if (values.description?.value) myVariables.contents = values.description?.value;

      if (typeof router.query.boardId !== "string") {
        alert(`boardId type is string`);
        return;
      }

      // const isValid = await checkValid();
      // if(isValid) {
      const result = await updateBoard({
        variables: {
          updateBoardInput: myVariables,
          password: values.password.value,
          boardId: router.query.boardId,
        },
      });
      router.push(`/boards/${result?.data?.updateBoard?._id}`);
      // }
    } else {
      setValues((prevValues) => {
        const newValues = { ...prevValues };
        (Object.keys(newValues) as Array<keyof IValues>).forEach((key) => {
          if (!newValues[key].value) {
            newValues[key].error = "내용을 입력해주세요";
          } else {
            newValues[key].error = "";
          }
        });
        return newValues;
      });
      const isValid = checkValid();
      if (isValid) {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: values.writer.value,
              password: values.password.value,
              title: values.title.value,
              contents: values.description.value,
            },
          },
        });
        await router.push(`/boards/${result?.data?.createBoard?._id}`);
      }
    }
  };

  // useEffect(() => {
  //     const isValid = validKey.every(key => values[key]?.value);
  //     setIsActive(isValid);
  // }, [values]);

  return <BoardWriteUI data={props.data} values={values} onChangeValue={onChangeValue} onUploadBoard={onUploadBoard} isActive={isActive} isEdit={props.isEdit} />;
}
