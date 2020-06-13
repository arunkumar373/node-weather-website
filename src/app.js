const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 4000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location 
app.set('view engine', "hbs")
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather',
        name: 'Arun'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Sorry! I can't help u",
        title: 'Help',
        name: 'Arun'
       
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
           if(error) {
              return  res.send({error});
           }

           forecast(latitude, longitude, (error, forecastData) => {
               if(error) {
                   return res.send({error});
               }
               res.send({
                   forecast: forecastData,
                   location,
                   address: req.query.address
               })
           })
    })


})


app.get('/product', (req, res) => {
    if(!req.query.search) {
          return res.send({
              error: 'You must provide a search term'
          })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arun',
        errorMessage: 'Help article not found!'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arun',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log(`server has started! on port no ${port}`);
})