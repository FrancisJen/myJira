import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Helmet } from "react-helmet";
import { TestClosure } from "./test-closure";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib";

//基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，不可以放到依赖里
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  useDocumentTitle("Project List", true);

  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1> Project List </h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          create project
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
