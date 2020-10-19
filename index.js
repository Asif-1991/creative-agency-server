const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fvezj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const port = 5000;
const app = express()

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("Hello From Creative agency")

})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db("creativeAgency").collection("orders");
  const reviewCollection = client.db("creativeAgency").collection("reviews");

  const servicesCollection = client.db("creativeAgency").collection("services");
  const adminCollection = client.db("creativeAgency").collection("admin");

  app.post('/addOrder', (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order)
    .then((result) => {
        res.send(result)
    })
  })

  app.get('/allOrder', (req, res) => {
    orderCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.post('/addReview', (req, res) => {
    const review = req.body;
    reviewCollection.insertOne(review)
    .then((result) => {
        res.send(result)
    })
  })

  app.get('/review', (req, res) => {
    reviewCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.post('/addService', (req, res) => {
    const service = req.body;
    serviceCollection.insertOne(service)
    .then((result) => {
        res.send(result)
    })
  })

  app.get('/services', (req, res) => {
    servicesCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

  app.post('/adminEmail', (req, res) => {
    const email = req.body;
    adminCollection.insertOne(email)
    .then((result) => {
        res.send(result)
    })
  })

  app.get('/isAdmin', (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email })
    .toArray((err, adminEmail) => {
        res.send(adminEmail)
    })
  })

});










app.listen(process.env.PORT || port);