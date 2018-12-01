const MongoClient = require('mongodb')
const axios = require('axios');
const url = 'https://catfact.ninja/'

//should this be state {} or is declaring global ok?
let db = null;
let client = null;


const getMetaData = function () {  
    let data = axios.get(url+"facts")
    .then(response => {
        return response.data
    }).catch(error => console.log(error));
   return data;
}

const dataArray =  function (total) {
    let baseUrl = url+"facts?page="      
    let promises = [];
    for (let page = 1; page <= total; page++){
        promises.push(axios.get(baseUrl))
    }
    return axios
        .all(promises)
        .then(result => result.map(({data}) => data.data)
        .reduce((curr, acc) => acc.concat(curr), []));
     
    }
   

exports.connect = async function(url, done) {
    if (db) return done();

    let data = await getMetaData()
    let total = data['total']
    let facts = await dataArray(total);

    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client){
        if (err) return done(err);
        client = client;
        db = client.db('morefun');    

        db.collection('catfacts').insertMany(facts, function(err, res){
            if (err) throw err;
            console.log(`Success! Inserted: ${res.insertedCount} documents.`);
        })
        done();       
    });   
}

exports.get = function() {
    return db;
}

//make sure this is correct
exports.close = function(done) {
    if (db) {
        client.close(function(err, result) {
            db = null;
            mode = null;
            done(err);
        });
    }
}


        
