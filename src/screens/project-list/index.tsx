import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Helmet } from "react-helmet";
import { TestClosure } from "./test-closure";
import { useUrlQueryParam } from "../../utils/url";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  //基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，不可以放到依赖里
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  console.log(param, "param");

  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  useDocumentTitle("Project List", true);

  return (
    <Container>
      <h1> Project List </h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
