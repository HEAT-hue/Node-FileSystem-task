//jshint esversion:6
const fs = require("fs");           //file handling
const path = require("path");       //directory handling
const https = require("https");  

//get current directory
const myDir = path.dirname(__filename);

//get result directory
const resultDir = path.join(myDir, "result");

//get post.txt file path
const postFile = path.join(resultDir,"posts.txt");

//url of API
const url = "https://jsonplaceholder.typicode.com/posts";

const req = https.get(url, (res) => {
  let data = "";

  //listen for chunks of data
  res.on("data", (chunk) => {
    data += chunk;
  });

  //whole response received
  res.on("end", () => {
    //write result to post.txt file
    fs.writeFileSync(postFile, data, (err) => {
        if (err) throw err;
    });
  });
});

//handling get error
req.on("error", (err) => {
  console.log(`Error ${err.message}`);
});