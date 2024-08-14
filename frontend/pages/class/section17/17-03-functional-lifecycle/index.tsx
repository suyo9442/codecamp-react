import { useEffect, useState } from "react";

export default function ClassCounterPage() {
  const [count, setCount] = useState(0);

  // componentDidMount
  useEffect(() => {
    console.log("렌더링 직후 실행");
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log("상태가 변경되면 실행");
  });

  // componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("언마운트 시 실행");
    };
  }, []);

  // 잘못된 사용
  // useEffect(() => {
  //   setCount(1);
  // }, [count]);
  //
  // useEffect(() => {
  //   setCount(prev => prev + 1);
  // }, [count]);

  const onCountUp = (): void => {
    setCount(1);
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onCountUp}>COUNT UP</button>
    </>
  );
}
