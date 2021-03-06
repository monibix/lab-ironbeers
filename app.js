const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(`${__dirname}/views/partials`);

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beerList = await punkAPI.getBeers()
  res.render('beers', {beerList} );
});

app.get('/random-beers', async (req, res) => {
  const beerRandom = await punkAPI.getRandom()
  console.log(beerRandom)
  res.render('random-beers', {beerRandom});
});

//Algo no tengo bien entendido con los parametros en los partials.
// app.get('/beers/:beerId', async (req, res,) => {
//   const { beerId } = await punkAPI.getBeer(req.params.id) 
//   console.log("Beer ID:", beerId)
//   res.send(`${beerId}`)
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));


