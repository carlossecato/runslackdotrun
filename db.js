const { Client } = require('pg');
var express = require("express");
var app = express();
var conString = "postgres://carlossecato:1234@localhost/carlosdb";


const client = new Client({
  connectionString: process.env.DATABASE_URL || conString,
  
  ssl: {
   rejectUnauthorized: false
  }
});

client.connect();
console.log('db connected');


client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }

  client.end();
  });
