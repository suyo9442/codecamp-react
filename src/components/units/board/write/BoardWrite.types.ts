import { IQuery } from "@/src/commons/types/generated/type";
import {ChangeEvent} from "react";

// BoardWrite.container
export interface IBoardWriteProps {
    isEdit: boolean,
    data?: Pick<IQuery, "fetchBoard">
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
