const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'morefun';
const url = 'mongodb://localhost'
const client = new MongoClient(url);


module.exports = function() {
  
    client.connect(function(err) {
        assert.equal(null, err);
        console.log(`Successfully connected to database ${dbName}...`);
        const db =  client.db(dbName);
        client.close();
    });


}