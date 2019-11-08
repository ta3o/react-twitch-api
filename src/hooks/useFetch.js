import React from 'react';
import axios from 'axios';
import handleRequest from './handle-request';

async function doRequest(method, uri, form, cancelToken, contentType = 'application/json') {
  let formData;
  if (contentType === 'multipart/form-data') {
    formData = new FormData();
    Object.keys(form).forEach((property) => {
      if (Array.isArray(form[property])) {
        form[property].forEach((el) => formData.append(`${property}[]`, el));
      } else {
        formData.set(property, form[property]);
      }
    });
  } else {
    formData = form;
  }
  const config = { cancelToken };
  return handleRequest(method, uri, formData, config);
}

function useFetch(initialConfig) {
  const config = {
    uri: initialConfig.url || '',
    form: initialConfig.form || {},
    contentType: initialConfig.contentType || 'application/json',
    method: initialConfig.method || 'get',
    showSuccessMessage: initialConfig.showSuccessMessage || true,
    showErrorMessage: initialConfig.showErrorMessage || true,
  };
  // const dispatch = useContext(DispatchMessageContext);
  const [uri, setUri] = React.useState(config.uri);
  const [form, setForm] = React.useState(config.form);
  const [method, setMethod] = React.useState(config.method);
  const [contentType, setContentType] = React.useState(config.contentType);
  const [isLoading, setIsLoading] = React.useState(false);
  const { CancelToken } = axios;
  const { token, cancel } = CancelToken.source();

  React.useEffect(() => {
    return () => cancel('component unmount');
  }, [uri, form]);

  const fetch = async (data = null, conf = {}) => {
    setIsLoading(true);
    const response = await doRequest(
      conf.method || method,
      conf.url || uri,
      data || form,
      token,
      conf.contentType || contentType,
    );
    setIsLoading(false);
    return response;
  };

  return {
    uri, setUri, form, setForm, fetch, isLoading, setMethod, setContentType,
  };
}

export default useFetch;
