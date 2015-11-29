import app from './app';
import debug from 'debug';

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug.log(`Express server listening on port ${server.address().port}`);
});
