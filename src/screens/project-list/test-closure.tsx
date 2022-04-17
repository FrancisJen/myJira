import { useEffect, useState } from "react";
import { useMount } from "../../utils";

const testClosure = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `current value of num: ${num}`;
    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};

const add = testClosure();
const unmount = add();
add();
add();
unmount();

// react hook 与闭包经典的坑
export const TestClosure = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval:", num);
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>num: {num}</p>
    </div>
  );
};
