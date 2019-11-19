const app = require('express')();
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('It\'s alive!'));

app.post('/message', (req, res) => {
  const { body } = req;

  if (!body.message || !body.message.text) {
    return res.send('no message')
  }

  const { text: incoming } = body.message;

  const answer = { text: 'I didn\'t catch that, could you repeat the sentence?' };

  switch(incoming.toLowerCase()) {
    case 'hello':
      answer = { text: 'Hi, how are you?' };
      break;
    case 'good':
      answer = { text: 'Nice, I\'m happy for you' };
      break;
    case 'bad':
      answer = { text: 'Oh no, you are such a loser' };
      break;
    case 'goodbye':
      answer = { text: 'Nice talking to you', action: 'hangup' };
      break;
    default: break;
  }

  res.json(answer);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})