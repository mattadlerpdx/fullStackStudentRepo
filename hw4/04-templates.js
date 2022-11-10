const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";

// Add your code here

//get data from API
const serverData = [];
axios.get(url).then((resp) => {
  resp.data.forEach((element) => {
    toRenderObj = {};
    toRenderObj.countryName = element.name;
    toRenderObj.capital = element.capital;
    toRenderObj.population = element.population;
    toRenderObj.region = element.region;
    serverData.push(toRenderObj);
  });
  //console.log(serverData);
});

app.get("/", (req, res) => {
  // render pug template for the index.html file

  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});

app.get("/capitals", (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  let results = [];
  serverData.forEach((element) => {
    //let countryObj = {};
    let country = element.countryName.common;
    let capital = element.capital;
    let tuple = `${country}, Captial: ${capital}`;
    //results[country]= capital
    //countryObj[country] = capital;
    results.push(tuple);
  });
  //console.log(results);
  let countries = ["Afghanistan", "Aland Islands", "Albania"];
  res.render("page", {
    heading: "Countries and Capitals",
    results: results,
  });
});

app.get("/populous", (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  //let populous = ["China", "India", "United States of America"];

   let populous = [];
   serverData.forEach((element) => {
     
     if (element.population >= 500000000){
       let country = element.countryName.common;
       let pop = element.population;
       let tuple = `${country}, Captial: ${pop}`;
       populous.push(tuple);
     }
   });

  res.render("page", {
    heading: "Most Populous Countries",
    results: populous,
  });
});

app.get("/regions", (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  //let regions = ["Asia - 50", "Europe - 53", "Africa - 60"];
   let regions = [];
   let AsiaCounter = 0;
   let EuropeCounter = 0;
   let AfricaCounter = 0;
     let asTuple = `Asia: ${AsiaCounter}`;
     let eurTuple = `Europe: ${EuropeCounter}`;
     let aftuple = `Africa: ${AfricaCounter}`;
   serverData.forEach((element) => {
     let countryObj = {};
     if (element.region == "Asia") {
       AsiaCounter += 1;
       asTuple = `Asia: ${AsiaCounter}`;
     } else if (element.region == "Europe") {
       EuropeCounter += 1;
       eurTuple = `Europe: ${EuropeCounter}`;
     } else if (element.region == "Africa") {
       AfricaCounter += 1;
       aftuple = `Africa: ${AfricaCounter}`;
     }
   });
     regions.push(asTuple);
     regions.push(eurTuple);
     regions.push(aftuple);
       

  res.render("page", {
    heading: "Regions of the World",
    results: regions,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
