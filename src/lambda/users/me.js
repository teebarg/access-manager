import faunadb from 'faunadb';
const { handleError, handleSuccess } = require('../../utils/response-handler');

/* configure faunaDB Client with our secret */
const q = faunadb.query;

const meHandler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const client = new faunadb.Client({
    secret: event.headers.secret,
  });
  return client
    .query(
      q.Get(q.Ref(q.Collection("SpaceUsers"), event.headers.id))
    )
    .then((response) => {
      response.data['id'] = response.ref.id
      return handleSuccess(response)
    })
    .catch(handleError);
};

export default meHandler;
