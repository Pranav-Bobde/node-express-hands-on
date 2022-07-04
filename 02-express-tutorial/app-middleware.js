const express = require('express')
const path = require('path')
const logger = require('./logger')
const authorise = require('./authorise')

const {products} = require('./data')

const app = express()

// setup static & middleware
// app.use(express.static('./public'))

app.use([authorise, logger])

app.get('/', (req, res)=>{
    res.send("<h1>Home Page</h1> <a href='/about'>About</a>")
})

app.get('/about', (req, res)=>{
    res.send("<h1>About Page</h1> <a href='/'>Home</a>")
})

app.get('/api/products/:productID', (req, res) => {
    const {productID} = req.params
    const singleProduct = products.find((product) => product.id == Number(productID))
    if(!singleProduct)
        res.status(404).send('Product Does Not Exist')
    res.json(singleProduct);
})

app.get('/api/v1/query', (req, res) => {
    const {search, limit} = req.query;
    let sortedProducts = [...products];
    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length < 1)
        return res.status(200).send({success: true, data: []})
    res.status(200).json(sortedProducts);
})

app.all('*', (req, res) =>{
    res.status(404).send('Resouce not found')
})

app.listen(3000, () =>  {
    console.log('Server listening on 3000...');
})