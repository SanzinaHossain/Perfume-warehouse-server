const express=require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT || 5000;
const app=express();
//password wbVLAYVSDlQzI3dT;
//middleware
app.use(cors());
app.use(express.json());
//database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nalfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const serviceCollection=client.db('assignment-11').collection('items');
        //collect all data
        app.get('/items',async(req,res)=>{
            const query={};
            const cursor=serviceCollection.find(query);
            const item=await cursor.toArray();
            res.send(item);
         })
    } 
    finally{

    }
}
run().catch(console.dir);
//app get
app.get('/',(req,res)=>{
    res.send("assignment-11");
})
//app listen
app.listen(port,()=>{
    console.log("working " ,port)
})