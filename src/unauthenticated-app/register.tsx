import { FormEvent, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    register({ username, password });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "pls input username" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "pls input password" }]}
      >
        <Input placeholder={"password"} type="password" id={"password"}></Input>
      </Form.Item>

      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
