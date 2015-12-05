import express from 'express';
import bodyParser from 'body-parser';
import {graphql} from  'graphql';
import schema from './schema/user';

const app = express();

app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2));
    });
});

export default app;
