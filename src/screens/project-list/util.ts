import { useUrlQueryParam } from "../../utils/url";
import { set } from "husky";
import { useMemo } from "react";
import { useProject } from "../../utils/project";
import { useSearchParams } from "react-router-dom";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const projectsParams = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  );
  return [projectsParams, setParam] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [_, setUrlParams] = useSearchParams();
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setUrlParams({
      projectCreate: "",
      editingProjectId: "",
    });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
