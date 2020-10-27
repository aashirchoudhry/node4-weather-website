const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Define Paths for Express conig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs' )
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Aashir'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return res.send({
                error: error
            })
        }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
    
        })
    })
})
})
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage:'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})