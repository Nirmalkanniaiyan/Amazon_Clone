const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  ""
);
// Enter your stripe API key 

// app.post("/payments/create", async (req, res) => {
//   const total = req.query.total; //this will be in sub currencies

//   console.log("Payment recieved", total);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total, // subunits of the currency
//     currency: "usd",
//   });

//   //status 200 means good , 201 means ok created something
//   res.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

//API

// -app config

const app = express();

// - Middlewares

app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => res.status(200).send("hello wordl"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total; // this will be the amount in sub units

  console.log(`Request payment amount >>> ${total}`);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  //status 200 means good , 201 means ok created something
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// // this is the set up needed to get the backend express app running on a cloud function

// // API end point(here is where the API is running) --
