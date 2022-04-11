import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
          login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
