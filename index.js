const express = require('express')
const request = require('request-promise')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 7077



const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



//allow app to pass json input
app.use(express.json())

app.get('/', (req, res, next)=>{
    res.send('Welcome to Amazon Scraper API');
    
})



  




//  GET product Details
app.get('/products/:productId', async (req, res)=>{
    const {productId} = req.params;
 const {api_key} = req.query;
    try{
 const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/dp/${productId}`)
res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})


//GET Product Reviews
app.get('/products/:productId/reviews', async (req, res)=>{
    const {productId} = req.params;
      const {api_key} = req.query;

    try{
 const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/product-reviews/${productId}`)
res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})


//GET Product Offers
app.get('/products/:productId/offers', async (req, res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;

    try{
 const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/gp/offer-listing/${productId}`)
res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})


//GET Search Result
app.get('/search/:searchQuery', async (req, res)=>{
    const {searchQuery} = req.params;
   const {api_key} = req.query;

    try{
 const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/s?k=${searchQuery}`)
res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})








app.get('/products/:productId', async (req, res)=>{
    const {productId} = req.params;
 
    try{
 const response = await request(`(apikey)&url=http://www.amazon.com/dp/${productId}`)
res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))