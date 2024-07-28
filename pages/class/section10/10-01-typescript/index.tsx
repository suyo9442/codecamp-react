export default function TypescriptPage() {
    // 타입추론
    let aaa = "안녕하세요"
    aaa = '300'

    // 타입명시 (굳이?)
    let bbb: string = "안녕하세요"
    bbb = '300'

    // 타입명시가 필요한 상황
    let ccc: string | number = "안녕하세요"
    ccc = 300
    ccc = '300원'

    // 불린타입
    let ddd: boolean = true
    ddd = false
    // ddd = "false" --> ❌

    // 배열타입
    let eee: number[] = [1, 2, 3]
    let fff: (string | number)[] = [1, 2, 3, '사']
    // eee = [1, 2, 3, '사'] --> ❌

    // 객체타입
    interface IProfile {
        name: string
        age: number | string
        school: string
        hobby?: string
    }
    const profile:IProfile = {
        name: '철수',
        age: '8살',
        school: '다람쥐초등학교'
    }

    // 함수타입
    function add(num1: number, num2: number, unit: string): string {
        return num1 + num2 + unit
    }
    const add2 = (num1: number, num2: number, unit: string): string => {
        return num1 + num2 + unit
    }

    return <></>
}
