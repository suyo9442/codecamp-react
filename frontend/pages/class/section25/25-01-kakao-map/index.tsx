import {useEffect} from "react";

declare const window: typeof globalThis & {
	kakao: any;
}

export default function KaKaoMapPage(): JSX.Element {
	useEffect(() => {
		const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
    	center: new window.kakao.maps.LatLng(37.538710, 126.891410), //지도의 중심좌표.
    	level: 3 //지도의 레벨(확대, 축소 정도)
    };
    
    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    console.log(map)
	}, [])
	
	return (
		<>
			<script
				type="text/javascript"
				src="//dapi.kakao.com/v2/maps/sdk.js?appkey=24b331153be852b463b5bded40f19a8b"/>
			<div id="map" style={{width: 500, height: 400}}/>
		</>
	);
}
