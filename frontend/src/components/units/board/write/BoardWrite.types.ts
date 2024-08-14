import { type IQuery } from "@/src/commons/types/generated/type";
import { type ChangeEvent } from "react";
import { type Address } from "react-daum-postcode";

// BoardWrite.container
export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}
export interface Field {
  value: string;
  error?: string;
}
export interface IValues {
  writer: Field;
  password: Field;
  title: Field;
  description: Field;
  youtubeUrl: Field;
  mainType: Field;
}
export const initialState: IValues = {
  writer: { value: "", error: "" },
  password: { value: "", error: "" },
  title: { value: "", error: "" },
  description: { value: "", error: "" },
  youtubeUrl: { value: "", error: "" },
  mainType: { value: "youtube", error: "" },
};

export interface IAddress {
  zipcode: string;
  address: string;
  addressDetail: string;
}
export interface IMyVariables {
  title?: string;
  contents?: string;
	images?: string[];
}

// BoardWrite.presenter
export type ChangeEventHandler = (name: keyof IValues, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export interface IBoardWriteUIProps {
  data?: Pick<IQuery, "fetchBoard">;
  values: IValues;
  address: IAddress;
  isActive: boolean;
  isEdit: boolean;
  isModalOpen: boolean;
  onChangeValue: ChangeEventHandler;
  onUploadBoard: (isEdit: boolean) => void;
  onToggleModal: () => void;
  onSetAddress: (data: Address) => void;
  onSetAddressDetail: (value: string) => void;
	imgUrl?: string[];
	onDeleteFile: (idx: number) => void;
	onSetImgUrls: (img: string, idx: number) => void;
}

// BoardWrite.styles
export interface ICTButtonFilledProps {
  width?: string;
  bgColor?: string;
  isActive?: boolean;
  padding?: string;
  margin?: string;
  onClick?: () => void;
  color: string;
}

// BoardImg.container
export interface IBoardImgProps {
	onDeleteFile: (idx: number) => void;
	onSetImgUrls: (img: string, idx: number) => void;
	item?: string;
	idx: number;
}
