const express = require('express');
const bodyParser = require('body-parser');
const bcrypt   = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(cors());
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
  }
});

app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.send('Its working ');
})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res,db)})

app.listen(process.env.PORT || 3000, () => {
	console.log('server started successfully!!!!');
})
