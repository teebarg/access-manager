function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem("__user_token__");
  const id = window.localStorage.getItem("__user_id__");
  const headers = { "content-type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  headers.id = id ? id : '';
  headers.secret = token ? token : '';
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${process.env.REACT_APP_END_POINT}/${endpoint}`, config)
    .then((response) => {
      if (!response.ok) {
        throw Error('Contact Admin');
      }
      return response.json();
    })
    .catch(function (error) {
      throw Error(error);
    });
}

export default client;
