interface IExampleProps {
  school: string;
  children: JSX.Element;
}

export default function Example(props: IExampleProps): JSX.Element {
  return (
    <div>
      <div>안녕하세요 김일여에요</div>
      <div>안녕하세요 김이여에요</div>

      <br />

      <span>⬇️ props ⬇️</span>
      <div>{props.school}</div>

      <br />

      <span>⬇️ props.children ⬇️</span>
      {props.children}
    </div>
  );
}
