
// @ts-ignore
function first<T1>(arg1: T1) {
	return function second<T2>(arg2: T2): [T1, T2] {
		return [arg1, arg2];
	}
}
const res1 = first("영희")(8)


const 로그인체크 = <T1>(Component: T1) => <T2>(Props: T2): [T1, T2] => [Component, Props];
const res2 = 로그인체크("영희")(8)
