// src/customers/create.js

require('dotenv').config();
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {

  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  const item = {
    data: data
  };
  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref('classes/customers'), item))
    .then(response => {
      response.data['id'] = response.ref.id;
      response.data['ts'] = response.ts;
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};