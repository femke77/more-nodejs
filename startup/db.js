const MongoClient = require('mongodb')
const axios = require('axios');
const url = 'https://catfact.ninja/fact'
let db = null;

//get number by doing a call to "total" under/facts and limit is "per page" then use axios all the fill the array and return the array
//by doing each get but resovling the promises together

let getData = function getData() {
    let data = axios.get(url)
    .then(response => {
        return response.data
    }).catch(error => console.log(error))
    return data;
}

exports.connect = async function(url, done) {
    if (db) return done();
    let data = await getData();
    
 
    
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client){
        if (err) return done(err);
        db = client.db('morefun');    
        db.collection('catfacts').insertMany(dataArray, function(err, res){
            if (err) throw err;
            console.log(res.insertedCount);
        })
        done();
        
        
    });
      
    
}

exports.get = function() {
    return db;
}


exports.close = function(done) {
    if (db) {
        db.close(function(err, result) {
            db = null;
            mode = null;
            done(err);
        });
    }
}

exports.httpRequest = function() {
        console.log(db)
        
      //  axios.get('https://cat-fact.herokuapp.com/facts').then((result) => db.collection('catfacts').insertMany(result, err => console.log(err)))
  
    //JSON.stringify(result, 2, null)
   
}
 


 //axios.get('https://cat-fact.herokuapp.com/facts').then((result) => console.log(JSON.stringify(result.data, null, 2)));
 //(res) => db.collection('catfacts').insertMany(res) 