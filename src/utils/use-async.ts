import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, setState] = useState(<State<D>>{
    ...defaultInitialState,
    ...initialState,
  });

  //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数的话，就不能直接传入函数
  const [reload, setReload] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  //run用来触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { reload: () => Promise<D> }
  ) => {
    if (!promise || !promise.then()) {
      throw new Error("请传入Promise类型数据");
    }
    setReload(() => () => {
      if (runConfig?.reload) {
        run(runConfig?.reload(), runConfig);
      }
      run(promise);
    });
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        //catch会消化异常，不主动抛出，外面接受不到异常
        setError(error);
        if (config.throwError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
    //reload被调用的时候重新跑一遍run， 让state刷新一遍
    reload,
  };
};
