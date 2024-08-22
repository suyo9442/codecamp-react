import {useRouter} from "next/router"; import Link from "next/link";
export default function KaKaoMapPage(): JSX.Element {
	const router = useRouter();
	const onClickMove = (): void => {
		void router.push("/class/section25/25-02-kakao-map-routing-moved");
	}
	
	return (
		<>
			<button onClick={onClickMove}>카카오지도로 이동</button>
			
			{/* 매 페이지를 새로 다운로드 받아오므로 SPA 활용 못함 */}
			<a href={"/class/section25/25-02-kakao-map-routing-moved"} > 페이지 이동1 </a>
			
			{/* 가급적 링크태그부터 안돼면 라우터푸쉬 */}
			<Link href={"/class/section25/25-02-kakao-map-routing-moved"} >
				<a> 페이지 이동2 </a>
			</Link>
		</>
		
	);
}
