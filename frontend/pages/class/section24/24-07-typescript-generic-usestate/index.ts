
export function useState<S>(initialValue: S): [S, (changeValue: S) => void] {
	let state = initialValue;
	
	const setState = (changeValue: S): void => {
		console.log(`기존 state 값을 ${changeValue}으로 변경`);
		console.log(`재렌더링 !`);
	}
	
	return [state, setState]
}

const [count, setCount] = useState(10)
