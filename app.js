require("dotenv").config();
const express = require('express');
const https = require('https');
const request = require('request');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) { 

    res.sendFile(__dirname + "/signup.html");
    
 });

 app.post("/", function (req, res) { 

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;

    console.log(firstName, lastName, emailAddress);

    const data = {
        members:[
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = process.env.URL;

    const options = {
        method: "POST",
        auth: process.env.AUTHKEY,
    }

    const request = https.request(url, options, function (response) { 

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) { 

         });
     });
        request.write(jsonData);
        request.end();
  });

app.post("/failure", function (req, res) { 
    res.redirect("/");
 });

app.listen(process.env.PORT || 3000, function () { 
    console.log("App is running on port 3000");
 });
