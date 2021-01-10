// import handleError from '../../utils/error-handler'
// src/customers/read-all.js
require("dotenv").config();
const { handleSuccess, handleError } = require("../../utils/response-handler");

const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (event, context) => {

  const client = new faunadb.Client({
    secret: event.headers.secret,
  });

  return (
    client
      .query(q.Paginate(q.Match(q.Ref("indexes/all_customers"))))
      .then((response) => {
        const itemRefs = response.data;
        // create new query out of item refs. http://bit.ly/2LG3MLg
        const getAllItemsDataQuery = itemRefs.map((ref) => {
          return q.Get(ref);
        });
        // then query the refs.
        return client.query(getAllItemsDataQuery).then((ret) => {
          // wellformedData includes customers id in the response.
          const wellformedData = ret.map((malformedResponse) => {
            return {
              id: malformedResponse.ref.id,
              ts: malformedResponse.ts,
              ...malformedResponse.data,
            };
          });
          return handleSuccess(wellformedData);
        });
      })
      .catch(handleError)
  );
};
