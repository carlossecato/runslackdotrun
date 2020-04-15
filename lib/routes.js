var express = require('express');
var app = express();
var passport = require("passport");
var request = require('request');
var router = express.Router();
const { Pool, Client } = require('pg')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const pool = new Pool({
 user: process.env.PGUSER || 'carlossecato',
 host: process.env.PGHOST || 'localhost',
 database: process.env.PGDATABASE || 'carlosdb',
 password: process.env.PGPASSWORD || '1234',
 port: process.env.PGPORT || '5432',
 ssl: true
});
var path = require('path');


app.use(express.static('public'));

module.exports = function (app) {

app.get('/join', function (req, res, next) {
 res.render('join', {title: "Join", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
 });
 
 
 app.post('/join', async function (req, res) {
 
 try{
 	debugger;
 const client = await pool.connect()
			await client.query('BEGIN')
			var pwd = await bcrypt.hash(req.body.password, 5);
 await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [req.body.username], function(err, result) {
 if(result.rows[0]){
 req.flash('warning', "This email address is already registered. <a href='/login'>Log in!</a>");
 res.redirect('/join');
 }
 else{
 	debugger;
 client.query('INSERT INTO users (id, “firstname”, “lastname”, email, password) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), req.body.firstName, req.body.lastName, req.body.username, pwd], function(err, result) {
 if(err){console.log(err);}
 else {
 
 client.query('COMMIT')
 console.log(result)
 req.flash('success','User created.')
 res.redirect('/login');
 return;
 }
 });
 
 
 }
 
 }));
 client.release();
 } 
 catch(e){throw(e)}
 });
}