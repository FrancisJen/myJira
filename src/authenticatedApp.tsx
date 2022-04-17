import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { Button, Dropdown, Menu, Typography } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const value: any = undefined;
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
          <h2>user</h2>
          <h2>project</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <Button type={"link"} onClick={logout}>
                    <Typography.Text type={"success"} italic={true}>
                      logout
                    </Typography.Text>
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas: "header" "main";
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
