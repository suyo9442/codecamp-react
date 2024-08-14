import { type IQuery,IQueryFetchBoardsArgs,IQueryFetchBoardsCountArgs } from "@/src/commons/types/generated/type";
import {ApolloQueryResult} from "@apollo/client"; import React from "react";

// BoardList.presenter
export interface ISrchDate {
  startDate: string;
  endDate: string;
}

export interface SearchProps {
  // srchDate: ISrchDate;
  // onChangeDateInput: (e: ChangeEvent<HTMLInputElement>) => void;
  refetch?: (variables?: Partial<IQueryFetchBoardsArgs> | undefined) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchBoardsCount?: (variables?: Partial<IQueryFetchBoardsCountArgs> | undefined) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
	keyword?: string;
	setKeyword?: React.Dispatch<React.SetStateAction<string>>;
	onMaskingValue?: (value: string) => string[];
}

export interface IBoardListProps extends SearchProps {
    data?: Pick<IQuery, "fetchBoards">;
    children: JSX.Element;
}

export interface IBoardListUIProps extends SearchProps {
  data?: Pick<IQuery, "fetchBoards">;
  onMoveToDetailPage: (id: string) => Promise<boolean>;
  onMoveToNewPage: () => Promise<boolean>;
  children: JSX.Element;
}
