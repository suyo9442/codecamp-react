import {type ComponentType, type ReactElement, useEffect} from "react";
import {useRouter} from "next/router";

export const 로그인체크 = (컴포넌트: () => JSX.Element) => <P extends Record<string, unknown>>(프롭스: P): ReactElement<P> => {
	const router = useRouter();
	
	useEffect(() => {
		if(localStorage.getItem("accessToken") === null) {
			alert("로그인 후 이용 가능합니다.");
			void router.push('')
		}
	}, [])
	
	return <컴포넌트 {...프롭스} />
}
