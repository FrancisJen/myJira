import { useUrlQueryParam } from "../../utils/url";
import { set } from "husky";
import { useMemo } from "react";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const projectsParams = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  );
  return [projectsParams, setParam] as const;
};
