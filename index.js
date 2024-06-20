//const express = require('express')
import express from 'express';
import mysql from 'mysql2/promise';
import cors from "cors";
import { response } from "./config/response.js";
import { BaseError } from "./config/error.js";
import { status } from "./config/response.status.js";
//import { tempRouter } from './routes/tempRoute.js';
//import { returnError } from './controllers/errorController.js';
import { userRouter } from './src/routes/userRoute.js';
import { storeRouter } from './src/routes/storeRoute.js';
import { tempRouter } from './src/routes/tempRoute.js';
const app = express();
//const port = 3000;
app.set("port", process.env.PORT || 3000);
import dotenv from "dotenv";
dotenv.config();

app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

export const db = mysql.createPool({
	host:process.env.DB_HOST,
	user:process.env.DB_USER,
	password:process.env.DB_PW,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	waitForConnections: true,
	insecureAuth: true
});
app.use("/temp",tempRouter);
app.use("/user",userRouter);
app.use("/store", storeRouter);
app.get('/', (req, res) => {
	//res.send('Hello World!testing nodemon....')
	  res.send("testing");	
  });
app.get('/user/signin', (req,res) => {
	res.sendFile(__dirname + "/public/signin.html");
})
app.get('/store/register', (req,res) => {
	res.sendFile(__dirname + "/public/registerStore.html");
});


app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});