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
import { useProjectsSearchParams } from "./util";
import { Row } from "../../components/lib";

//基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，不可以放到依赖里
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("Project List", true);

  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list, reload } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1> 项目列表 </h1>
        <Button onClick={() => props.setProjectModelOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModelOpen={props.setProjectModelOpen}
        refresh={reload}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
