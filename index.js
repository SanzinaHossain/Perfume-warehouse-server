const express=require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
         //collect a particular data using id
         app.get('/items/:id',async(req,res)=>{ 
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const item=await serviceCollection.findOne(query);
            res.send(item);
        })
         //for decrease quantity
         app.put('/items/:id',async(req,res)=>{
              const id = req.params.id;
              const qtn = parseInt(req.body.quantity);
              const query = {_id: ObjectId(id)};
              const item=await serviceCollection.findOne(query);
              if(item){
                  const data=qtn;
              
              const result= await serviceCollection.updateOne(query,{$set:{quantity:data}});
              res.send(result);
              }
      });
    //item delete
    app.delete('/items/:id', async(req,res)=>{
        const id = req.params.id;
        const query={_id:ObjectId(id)};
        const result=await serviceCollection.deleteOne(query);
        res.send(result)
    })
    //add item
    app.post('/items',async(req,res)=>{
        const newservice=req.body;
        const result=await serviceCollection.insertOne(newservice)
        res.send(result)
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