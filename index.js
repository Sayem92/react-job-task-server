const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9rpk71q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function run() {
    try {
        const JobTaskCollection = client.db("JobTask").collection("AddTask");


        app.post('/addTask', async (req, res) => {
            const task = req.body;
            console.log(task);
            const result = await JobTaskCollection.insertOne(task);
            res.send(result);
        });

        


    }
    finally {

    }
}

run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('react job task server is running');
})

app.listen(port, () => console.log(`react job task running on ${port}`))