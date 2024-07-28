export interface IProfile {
    name: string
    age: number
    school: string
    hobby?: string
}

// 1. Partial 타입
// {name?: string, age?: number, school?: string, hobby?: string}
type allOptionalType = Partial<IProfile>

// 2. Required 타입
// {name: string, age: number, school: string, hobby: string}
type allRequiredType = Required<IProfile>

// 3. Pick 타입
// {name: string, hobby?: string}
type pickType = Pick<IProfile, "name" | "hobby">

// 4. Omit 타입
// {name: string, age: number, hobby?: string}
type omitType = Omit<IProfile, "school">

/// 5. Union 타입
type unionType = "react" | "vue" | "angular"
const framework1: unionType = "react"
// const framework2: unionType = "other" --> ❌

// 6. Record 타입
// {react: IProfile, vue: IProfile, angular: IProfile}
type recordType = Record<unionType, IProfile>

// 7. keyof -> Union 타입
// "name" | "age" | "school" | "hobby"
type keyOfType = keyof IProfile

// 8. interface vs type --> 선언병합 가능 유무 (type는 불가능)
export interface IProfile {
    job: string
}
const profile: Partial<IProfile> = {
    job: '개발자'
}


