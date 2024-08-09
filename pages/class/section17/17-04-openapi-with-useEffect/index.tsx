import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenAPIWithUseEffectPage() {
  const [dog, setDog] = useState("");
  // const onShowDogs = async () => {
  //   const result = await axios.get("https://dog.ceo/api/breeds/image/random");
  //   console.log(result);
  //   const { message, state } = result?.data;
  //   setDog(message);
  // };

  useEffect(() => {
    const onClickSync = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      const { message, state } = result?.data;
      setDog(message);
    };

    onClickSync();
  }, []);

  return (
    <div>
      {/*<button onClick={onShowDogs}>갱얼쥐 뿅!</button>*/}
      {dog && <img src={dog} alt="dogs" />}
    </div>
  );
}
