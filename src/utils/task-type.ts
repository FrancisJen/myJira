import { useHttp } from "./http";
import { Project } from "../types/project";
import { useQuery } from "react-query";
import { Task } from "types/task";
import { TaskType } from "../types/task-type";

export const useTaskTypes = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () =>
    client("taskTypes", { data: param })
  );
};
