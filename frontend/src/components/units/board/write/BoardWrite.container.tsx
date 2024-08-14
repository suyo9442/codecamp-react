import { useRouter } from "next/router";
import {gql, useMutation } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import {ChangeEvent,useEffect, useState } from "react";
import { CREATE_BOARD, UPDATE_BOARDS } from "./BoardWriter.queries";
import {
  type IValues,
  type IBoardWriteProps,
  initialState,
  type ChangeEventHandler,
  type IAddress,
  type IMyVariables,
} from "@/src/components/units/board/write/BoardWrite.types";
import { type IMutation, type IMutationCreateBoardArgs, type IMutationUpdateBoardArgs,IMutationUploadFileArgs } from "@/src/commons/types/generated/type";
import { type Address } from "react-daum-postcode"; import {checkValidationImg} from "@/src/components/commons/libraries/validation";

// const validKey: Array<keyof IValues> = ["writer", "password", "title", "description"];

export default function BoardWrite(props: IBoardWriteProps): JSX.Element {
  const router = useRouter();
  const boardId = router.query?.boardId as string;

  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD);
  const [updateBoard] = useMutation<Pick<IMutation, "updateBoard">, IMutationUpdateBoardArgs>(UPDATE_BOARDS);

  const [values, setValues] = useState<IValues>(initialState);
  const [address, setAddress] = useState<IAddress>({
    zipcode: "",
    address: "",
    addressDetail: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeValue: ChangeEventHandler = (name, e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        value: e.target.value,
      },
    }));
  };
  const onUploadBoard = async (isEdit: boolean): Promise<void> => {
    // const checkValid = (): boolean => validKey.every((key) => values[key]?.value);
    const moveToBoardDetail = async (_id: string): Promise<void> => {
      if (_id === "") return;
      void router.push(`/boards/${_id}`);
    };
    const onCreateBoard = async (): Promise<string> => {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: values.writer.value,
            password: values.password.value,
            title: values.title.value,
            contents: values.description.value,
            youtubeUrl: values.youtubeUrl.value,
            boardAddress: {
              zipcode: address.zipcode,
              address: address.address,
              addressDetail: address.addressDetail,
            },
            images: imgUrl,
          },
        },
      });
      return result?.data?.createBoard._id ?? "";
    };
    const onUpdateBoard = async (): Promise<string> => {
      const myVariables: IMyVariables = {};
      if (values.title?.value !== "") myVariables.title = values.title?.value;
      if (values.description?.value !== "") myVariables.contents = values.description?.value;
			if (imgUrl.length > 0) myVariables.images = imgUrl

      const result = await updateBoard({
        variables: {
          updateBoardInput: myVariables,
          password: values.password.value,
          boardId,
        },
      });

      return result?.data?.updateBoard._id ?? "";
    };

    try {
      let _id: string = "";

      if (isEdit) {
        _id = await onUpdateBoard();
      } else {
        _id = await onCreateBoard();
      }

      if (_id !== "") {
        alert("성공");
        await moveToBoardDetail(_id);
      } else {
        alert("실패");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  // useEffect(() => {
  //     const isValid = validKey.every(key => values[key]?.value);
  //     setIsActive(isValid);
  // }, [values]);

  const onToggleModal = (): void => {
    setIsModalOpen((preVal) => !preVal);
  };
  const onSetAddress = (data: Address): void => {
    const { zonecode, address } = data;
    setAddress((preVal: IAddress) => ({
      ...preVal,
      zipcode: zonecode,
      address,
    }));
    onToggleModal();
  };
  const onSetAddressDetail = (value: string): void => {
    setAddress((preVal: IAddress) => ({
      ...preVal,
      addressDetail: value,
    }));

    console.log(address);
  };
	
	// 이미지 업로드
	const [imgUrl, setImgUrl] = useState<string[]>([]);
	const onSetImgUrls = (img: string, idx: number): void => {
		console.log('?')
		
		const _imgUrls = [...imgUrl]
		_imgUrls[idx] = img
		setImgUrl(_imgUrls);
	}
	const onDeleteFile = (idx: number): void => {
	  setImgUrl(prev => prev.filter((_, index) => index !== idx));
	};
	useEffect(() => {
	  const images: string[] = props.data?.fetchBoard.images || [];
		if(images === undefined) return;
		setImgUrl([...images])
	}, [props.data]);

  return (
    <BoardWriteUI
      data={props.data}
      values={values}
      address={address}
      isActive={isActive}
      isEdit={props.isEdit}
      isModalOpen={isModalOpen}
      onChangeValue={onChangeValue}
      onUploadBoard={onUploadBoard}
      onToggleModal={onToggleModal}
      onSetAddress={onSetAddress}
      onSetAddressDetail={onSetAddressDetail}
      imgUrl={imgUrl}
      onSetImgUrls={onSetImgUrls}
      onDeleteFile={onDeleteFile}
    />
  );
}
