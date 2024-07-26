import {ChangeEvent} from "react";

// BoardWrite.container
export interface BoardWriteProps {
    isEdit: boolean,
    data?: any // 나중에 코드젠으로 수정
}
export interface Field {
    value: string;
    error?: string; // error는 선택적 속성일 수 있음
}
export interface IValues {
    writer: Field;
    password: Field;
    title: Field;
    description: Field;
    address1: Field;
    address2: Field;
    address3: Field;
    youtubeUrl: Field;
    mainType: Field;
}
export const initialState: IValues = {
    writer: { value: '', error: '' },
    password: { value: '', error: '' },
    title: { value: '', error: '' },
    description: { value: '', error: '' },
    address1: { value: '', error: '' },
    address2: { value: '', error: '' },
    address3: { value: '', error: '' },
    youtubeUrl: { value: '', error: '' },
    mainType: { value: 'youtube', error: '' },
};

// BoardWrite.presenter
export type ChangeEventHandler = (name: keyof IValues, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export interface IBoardWriteUIProps {
    data?: any
    values: IValues,
    onChangeValue: ChangeEventHandler
    onUploadBoard: (isEdit: boolean) => void
    isActive: boolean
    isEdit: boolean
}

// BoardWrite.styles
export interface ICTButtonFilledProps {
    width?: string
    bgColor?: string
    isActive?: boolean
    padding?: string
    margin?: string
    onClick?: () => void
    color: string;
}
