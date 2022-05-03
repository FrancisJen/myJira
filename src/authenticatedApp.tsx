import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { Button, Dropdown, Menu, Typography } from "antd";
import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { useState } from "react";
import { ProjectModel } from "./screens/project-list/project-model";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModelOpen, setProjectModelOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModelOpen={setProjectModelOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModelOpen={setProjectModelOpen} />
              }
            ></Route>
            <Route
              path={"projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Route
              index
              element={
                <ProjectListScreen setProjectModelOpen={setProjectModelOpen} />
              }
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModel
        projectModelOpen={projectModelOpen}
        onClose={() => setProjectModelOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModelOpen={props.setProjectModelOpen} />
        <span>user</span>
        <User />
      </HeaderLeft>
      <HeaderRight></HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
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
