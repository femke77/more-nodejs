const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const url = 'https://catfact.ninja/';

let db = null;
let client = null;

const getMetaData =  () => {  
    let data = axios.get(url+"facts")
    .then(response => {
        return response.data
    }).catch(error => console.log(error));
   return data;
}

const dataArray =  (total) => {
    let baseUrl = url+"facts?page="      
    let promises = [];
    for (let page = 1; page <= total; page++){
        promises.push(axios.get(baseUrl));
    }
    return axios
        .all(promises)
        .then(result => result.map(({data}) => data.data)
        .reduce((curr, acc) => acc.concat(curr), []));    
    }

const insertManyCatFacts = async () => {   
    console.log("Fetching data...")
    let data = await getMetaData();
    let total = data['total'];
    let facts = await dataArray(total);
    db.collection('catfacts').insertMany(facts, (err, res) =>{
        if (err) throw err;
        console.log(`Success! Inserted: ${res.insertedCount} documents.`);
    });
}

exports.connect = async (url, done) => {
    if (db) return done();
    client = new MongoClient(url, {useNewUrlParser: true});
    client.connect(err => {
        if (err) return done(err);       
        db = client.db('morefun');  
        //insertManyCatFacts();
        done();       
    });   
}

exports.get = () => {
    return db;
}

exports.close = () => {
    if(client){
        client.close( err => {
            if (err) throw err
            db = null;
            client = null;
        });
    }
}



// issues:

// should global vars be changed to state {}?
// no assert statements

