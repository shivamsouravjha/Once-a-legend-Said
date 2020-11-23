const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
});

app.get('/api/quotes/random', (req, res, next) => {
    let some = getRandomElement(quotes);
    res.send({quote: some});
});



app.get('/api/quotes', (req, res, next) => {
  if (req.query.person) {
    let sam = [];
    for(let i =0;i<quotes.length;i++)
    {
      if(quotes[i].person.includes(req.query.person))
      {
        sam.push(quotes[i]);
      }
    }
          res.send({quotes:sam});

  } else {
        let sam = [];
        for(let i=0;i<quotes.length;i++)
        {
          sam.push(quotes[i])
        }
      res.send({quotes:sam});
  }
});
app.post('/api/quotes', (req, res, next) => {
  if (req.query.quote && req.query.person) {
      let receivedExpression = {quote: req.query.quote, person: req.query.person}
      quotes.push(receivedExpression);
      res.status(201).send({quote: quotes[quotes.length - 1]});
  } else {
    res.status(400).send();
  }
});
