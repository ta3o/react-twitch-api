import React from 'react';
import axios from 'axios';

const defaultConfig = {
  url: '',
  data: {},
  method: 'get',
  config: {},
};

function useFetch(initialConfig = defaultConfig) {
  const { data, ...others } = initialConfig;
  const [config, setConfig] = React.useState(others);
  const [responseData, setResponseData] = React.useState(data);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    let didUnmount = false;
    const { CancelToken } = axios;
    const { token, cancel } = CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios[config.method](
          config.url,
          { ...config.config, cancelToken: token },
        );
        if (!didUnmount) {
          console.log(response);
          setResponseData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!didUnmount) { console.log(error); }
      }
    };

    fetchData();

    return () => { didUnmount = true; cancel('component unmount'); };
  }, [config]);

  return [{ data: responseData, isLoading }, setConfig];
}

export default useFetch;
