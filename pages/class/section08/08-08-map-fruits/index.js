// For Preventing Le-rendering
const posts = [
    {
        id: '1',
        title: '첫 번째 게시글',
        content: '첫 번째 게시글의 내용입니다.',
        writer: '작성자1',
        createdAt: '2024-07-01'
    },
    {
        id: '2',
        title: '두 번째 게시글',
        content: '두 번째 게시글의 내용입니다.',
        writer: '작성자2',
        createdAt: '2024-07-02'
    },
    {
        id: '3',
        title: '세 번째 게시글',
        content: '세 번째 게시글의 내용입니다.',
        writer: '작성자3',
        createdAt: '2024-07-03'
    }
];

export default function MapFruitPage() {
    const example1 = posts.map(ele => <div>{`[${ele.id}번]: ${ele.title}`}</div>)

    return (
        <div>
            {/*예제1*/}
            {example1}

            <br/>

            {/*예제2 (실무)*/}
            {posts.map(ele => <div>{`[${ele.id}번]: ${ele.title}`}</div>)}
        </div>
    )
}
