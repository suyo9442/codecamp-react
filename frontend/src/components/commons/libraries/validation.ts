export const checkValidationImg = (file?: File): boolean => {
		if(typeof file === "undefined") {
		  alert("파일 없음");
		  return false;
		}
		
		// byte: 1
		// kb: 1024 (byte가 1024개 모이면)
		// mb: 1024 * 1024
		if(file.size > 5 * 1024 * 1024) {
		  alert("용량 초과");
		  return false;
		}
		
		if(!file.type.includes("jpeg") && !file.type.includes("png")) {
		  alert("jpeg 또는 png만 가능");
		  return false;
		}
		
		return true;
}
