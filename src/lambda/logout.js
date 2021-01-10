import faunadb from 'faunadb';
const { handleSuccess, handleError } = require('../utils/response-handler');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, '');

  switch (event.httpMethod) {
    case 'GET':
      // e.g. POST /.netlify/functions/customers with a body of key value pair objects, NOT strings
      return handler(event, context);
    case 'OPTIONS':
      // To enable CORS
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };
      return {
        statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
        headers,
        body: 'This was a preflight call!'
      };
  }
  return {
    statusCode: 500,
    body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
  };
};

const handler = async (event, context) => {
  return client
    .query(
      q.Logout(true)
    )
    .then(handleSuccess)
    .catch(handleError);
};
