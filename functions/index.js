const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("secret_key")

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send
("hello world"));

app.post("payment/create", async (req, res) => {
    const total = request.query.total;
    
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
      });

      response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
});

exports.api = functions.https.onRequest(app);

// Endpoint
// http://localhost:5001/clone-32628/us-central1/api
