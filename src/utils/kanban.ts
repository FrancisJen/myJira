import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { Project } from "../types/project";
import { useQuery } from "react-query";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Project[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
