import app from './app';

const PORT = 3000;

const server = app.listen(PORT, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`GraphQL listening at http://${host}:${port}`);
});
