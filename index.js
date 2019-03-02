const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const app = express();
const {
	fallbackHandler,
	notFoundHandler,
	genericErrorHandler,
	poweredByHandler
} = require('./handlers.js');

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 4999));

app.enable('verbose errors');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);

// --- SNAKE LOGIC GOES BELOW THIS LINE ---
// Include our classes
let Game = require('./classes/game.js');

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  const data = {
    color: '#0f52ba',
	headType: 'bendr',
	tailType: 'hook'
  }

  return response.json(data);
});

// Handle POST request to '/move'
app.post('/move', (request, response) => {
	let game = new Game(request.body);
	let move = game.getMove();
	return response.json({move: move});
});

app.post('/end', (request, response) => {
  return response.json({});
});

app.post('/ping', (request, response) => {
  return response.json({});
});

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler);
app.use(notFoundHandler);
//app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
	console.log('Server listening on port %s', app.get('port'))
});
