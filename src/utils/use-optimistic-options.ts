import { QueryKey, useQueryClient } from "react-query";
import { QueryKeys } from "react-query/types/devtools/styledComponents";
import { projects } from "jira-dev-tool/dist/server/initial-data";
import { findAllByPlaceholderText } from "@testing-library/react";
import { traceDeprecation } from "process";
import { Project } from "../types/project";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    OnError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        context as { previousItems: Project[] }
      );
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
