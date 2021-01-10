import faunadb from 'faunadb';

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);

  return client
    .query(
      q.Login(q.Match(q.Index("SpaceUsers_by_email"), data.email), {
        password: data.password,
      })
    )
    .then((response) => {
      response['id'] = response.instance.id
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      };
    })
    .catch((err) => {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(err),
      };
    });
};

export default handler;
