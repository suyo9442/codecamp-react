import {ButtonFilled, DateInput, SearchInput} from "@/src/components/units/board/list/BoardList.styles";
import _ from "lodash";
import {ChangeEvent} from "react";
import {SearchProps} from "@/src/components/units/board/list/BoardList.types"

export default function SearchBar(props: SearchProps) {
	  const onGetDebounce = _.debounce((value) => {
      props.refetch?.({search: value, page: 1});
			props.refetchBoardsCount?.({search: value})
      props.setKeyword?.(value)
    }, 700);
    const onSearchValue = (e: ChangeEvent<HTMLInputElement>): void => void onGetDebounce(e.currentTarget.value);

	return (
		<>
      <SearchInput placeholder="제목을 검색해주세요." onChange={onSearchValue} />
      <DateInput
        placeholder="yyyy.mm.dd ~ yyyy.mm.dd"
        defaultValue={""}
      />
      <ButtonFilled>검색하기</ButtonFilled>
		</>
	)
}
