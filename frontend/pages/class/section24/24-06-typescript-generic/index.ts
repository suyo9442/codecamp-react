// 1. 문자, 숫자, 불린 = primitive type
// @ts-ignore
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
	return [arg3, arg2, arg1]
}
const result1 = getPrimitive("철수", 123, true)


// 2. any type
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
	// console.log(arg1 * 1000) // 경고❌
	return [arg3, arg2, arg1]
}
const result2 = getAny(123, "??", 43)


// 3. unknown type (any보단 나음)
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
	// console.log(arg1 * 1000) // 경고⭕️
	return [arg3, arg2, arg1]
}
const result3 = getUnknown(123, "??", 43)


// 4. generic type
// any처럼 아무 인자나 들어가지만, 내부에서 타입을 정해줌
// 예시는 useState
// 제공자 입장에서 주로 쓰임
function getGeneric<T1, T2, T3> (arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
	return [arg3, arg2, arg1]
}
const result4 = getGeneric("123", "??", 1232); // 알아서 타입 정해줘~
const result5 = getGeneric<string, string, number>("123", "??", 1232); // 타입 내가 정할래!
// 화살표함수로 변환
const getGeneric2 = <T1, T2, T3> (arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] => [arg3, arg2, arg1]
