import React, { useState } from "react";
import { Rate } from "antd";

export default function App(): JSX.Element {
  const [value, setValue] = useState(3);
  return <Rate onChange={setValue} value={value} />;
}
