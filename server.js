const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexById, generateId } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));



app.get('/api/quotes/random', (req, res, next) => {
        const getRandomQuote = getRandomElement(quotes);
        res.send({quote: getRandomQuote});
})

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person === undefined) {
        res.send({
            quotes: quotes
        })
    } else {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.name);
        if (quotesByPerson.length > 1) {
            res.send({
                quotes: quotesByPerson
            })
        } else {
            res.send({
                quotes: []
            })
        }
    }

})

app.post('/api/quotes', (req, res, next) => {
    let quote = req.query;
    if (req.query.quote !== undefined && req.query.person !== undefined) {
        quotes.push(quote);
        res.status(201).send({
            quote: quote
        });
    } else {
        res.status(400).send();
    }
})

app.post('/api/quotes', (req, res) => {
    let newQuotePerson = req.query.person;
    let newQuote = req.query.quote;
    if (newQuote && newQuotePerson) {
      quotes.push(req.query);
      // Generate a new id for the quote
      generateId(quotes);
      res.status(201).send({quote: quotes[quotes.length-1]});
    } else {
      res.status(400).send('Quote not found with the id provided! 🤷‍♂️');
    }
  })

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})
