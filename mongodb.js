// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient

const {MongoClient , ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName  = 'task-manager'

const id = new ObjectID();
console.log(id);
// useNewUrlParser: true
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error,client) => {
    if(error)
    {
        return console.log('Unable to Connect');
    }

    const db = client.db(databaseName)

    db.collection('users').updateOne({
        _id: new ObjectID("5e258277db5a6f2c98c177ce")
    },{
        $set:{
            name: "YahYa"
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})