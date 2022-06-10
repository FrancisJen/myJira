import { useHttp } from "./http";
import { Project } from "../types/project";
import { useQuery } from "react-query";
import { Task } from "types/task";

export const useKanbans = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
