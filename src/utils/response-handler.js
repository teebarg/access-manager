exports.handleError = (err) => {
  console.error("Error in logout is: %s", err);
  return {
    statusCode: 400,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(err),
  };
};

exports.handleSuccess = (data) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
