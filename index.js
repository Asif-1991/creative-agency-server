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
  const collection = client.db("creativeAgency").collection("services");

    

});










app.listen(process.env.PORT || port);
