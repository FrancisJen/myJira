import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
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
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
