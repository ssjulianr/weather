'use strict';

// Weather App 


// First Step - Install our packages 

// Second Step - Store the packages as variables 

const express = require('express');
const app = express(); // This allows us to use app.xxx.xxxx instead of having to invoke the express() function 
const bodyParser = require('body-parser');
const https = require('https'); 

// This codes creates a path from the body of the URL to the index.html file. Does not yet contain the URL, just setting the path for it when the server receives the request 
app.use(bodyParser.urlencoded({extended: true})) // Pulling the API to the index page

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
})

// Here we will implement our API call to our URL 

// After app.get, we have to the post the information that is received 

app.post('/', (req, res) => {
    const cityName = req.body.cityName; // This is where we request the information from our bodyParser 
    const state = req.body.state
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},US&limit=&appid=b1b8cda403b30d53ea809fd1a4168f55`
    https.get(url,function(response){
        response.on("data",(data)=>{
        const countryData = JSON.parse(data)[0]
        const lat = countryData.lat
        const lon = countryData.lon

        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b1b8cda403b30d53ea809fd1a4168f55&units=imperial`; // Now we're creating a varibale for our url, which will hold our API key

        https.get(url2, (response) => {

            response.on('data', (data) => {
    
                const jsonData = JSON.parse(data);
                const temp = jsonData.main.temp;
                const des = jsonData.weather[0].description;
                const icon = jsonData.weather[0].icon;
                const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                console.log(jsonData);
                res.write(`<h1>The temperature in ${cityName} is ${temp}F </h1>`);
                res.write(`<p>The weather is considered ${des}</p>`)
                res.write('<img src = ' + imageURL + '>')
            })
        })


        })





    })


   


    
    
})

app.listen(5, () =>{
    console.log(`The Server is Working!`)
})

// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const https = require("https");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// app.post("/", function (req, res) {
//   const cityName = req.body.cityName;
//   const url = "https://api.openweathermap.org/data/2.5/weather?lat=35.227085&lon=-80.943054&appid=b1b8cda403b30d53ea809fd1a4168f55"
//   https.get(url, function (response) {
//     response.on("data", function (data) {
//       const jsondata = JSON.parse(data);
//       const temp = jsondata.main.temp;
//       const des = jsondata.weather[0].description;
//       const icon = jsondata.weather[0].icon;
//       const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//       res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
//       res.write(`<p>The weather description is ${des} </p>`);
//       res.write("<img src=" + imageurl + ">");
//       res.send();
//     });
//   });
// });

// app.listen(7)