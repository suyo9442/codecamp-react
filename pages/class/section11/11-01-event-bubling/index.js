export default function EventBublingPage() {
    const data = [
        {
            _id: '1',
            title: '안녕하세요',
            writer: '김철수'
        },
        {
            _id: '2',
            title: '반갑습니다',
            writer: '박영희'
        },
        {
            _id: '3',
            title: '가입인사 드립니다',
            writer: '서연아'
        }
    ]

    const onTest = (e) => {
        e.stopPropagation()
        alert(e.currentTarget.id + ' 를 클릭함')
    }

    return (
            <>
                {
                    data.map(list => (
                        <div id='[부모 div]' onClick={onTest}>
                            <span style={{margin: '10px'}}  id='[자식 checkbox]' onClick={onTest}><input type='checkbox'></input></span>
                            <span style={{margin: '10px'}}  id='[자식 _id]' onClick={onTest}>{list._id}</span>
                            <span style={{margin: '10px'}}  id='[자식 title]' onClick={onTest}>{list.title}</span>
                            <span style={{margin: '10px'}}  id='[자식 writer]' onClick={onTest}>{list.writer}</span>
                        </div>
                    ))
                }
            </>
    )
}
