import Example from "@/src/components/units/board/class/14-props-children-example";

export default function PropsChildrenPage() {
  return (
    <>
      <span>################### 여기는 PropsChildrenPage 입니다. ###################</span>
      <Example school="다람쥐초등학교">
        <div style={{ border: "1px solid violet" }}>
          <input type="text" style={{ border: "1px solid #000" }} />
          <span>반갑습니다.</span>
          <button>등록</button>
        </div>
      </Example>
      <span>################### 여기는 PropsChildrenPage 입니다. ###################</span>
    </>
  );
}
