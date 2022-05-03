import { Avatar, Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";
import twitter from "assets/icons8-twitter.svg";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();
  console.log(projects);
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>favorite project</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta
              avatar={<Avatar src={twitter} />}
              title={project.name}
            />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => props.setProjectModelOpen(true)}
        type={"link"}
      >
        create project
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>project</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 15rem;
`;
