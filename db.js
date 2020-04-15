const { Client } = require('pg');
var express = require("express");
var app = express();
//var conString = "postgres://carlossecato:1234@localhost/carlosdb";

module.exports = function (app) {
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  
  ssl: {
   rejectUnauthorized: false
  }
});

client.connect();
console.log('db connected');

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err){ 
     client.query(' CREATE TABLE public.users (id UUID NOT NULL, “firstName” CHAR(64), “lastName” CHAR(64), email CHAR(128), password CHAR(60),CONSTRAINT users_pkey PRIMARY KEY(id))WITH (oids = false);')
      
  
  }

 

  client.end();
  });

}