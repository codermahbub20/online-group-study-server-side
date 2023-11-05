const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// onlineGroupStudy
// L3cWOC1YmDlfk40b







const uri = `mongodb+srv://onlineGroupStudy:L3cWOC1YmDlfk40b@cluster0.rarr4yf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const createAssignmnetCollection = client.db('onlineStudy').collection('createAssignment');



        // create assignment related api

        app.post('/createAssignment', async (req, res) => {
            const user = req.body;
            const result = await createAssignmnetCollection.insertOne(user);
            res.send(result)

        })


        app.get('/createAssignment', async (req, res) => {
            const result = await createAssignmnetCollection.find().toArray();
            res.send(result)
        })

        // update Related api

        app.get('/createAssignment/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await createAssignmnetCollection.findOne(query)
            res.send(result)
        })


        app.put('/createAssignment/:id', async(req,res) =>{
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = {upsert: true};
            const updatedAssignment = req.body;
            const assignment = {
                $set: {
                    title:updatedAssignment.title,
                    description: updatedAssignment.description,
                    mark: updatedAssignment.mark,
                    photo: updatedAssignment.photo,
                    level: updatedAssignment.level,
                    date: updatedAssignment.date
                }
            } 
            const result = await createAssignmnetCollection.updateOne(filter,assignment)
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);








app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('online group study!')
})

app.listen(port, () => {
    console.log(`Online group study listening on port ${port}`)
})