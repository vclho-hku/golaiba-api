import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import admin from 'firebase-admin';
import schema from './schema';
import resolvers from './resolvers';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  db_user: process.env.DB_USER,
  db_pw: process.env.DB_PW,
  db_path: process.env.DB_PATH,
  port: process.env.PORT,
  host: process.env.HOST,
};

// var serviceAccount = require('../readsline-dev-firebase-adminsdk-860fw-a705289660.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://readsline-dev.firebaseio.com',
// });

// const token =
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiYWNjZXNzTGV2ZWwiOjEwLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhZHNsaW5lLWRldiIsImF1ZCI6InJlYWRzbGluZS1kZXYiLCJhdXRoX3RpbWUiOjE1OTE2MjU5MjAsInVzZXJfaWQiOiJVM2ZtWGI5djBEYVhlelpDTnNNajVJTXRoRTQzIiwic3ViIjoiVTNmbVhiOXYwRGFYZXpaQ05zTWo1SU10aEU0MyIsImlhdCI6MTU5MTYyNTkyMCwiZXhwIjoxNTkxNjI5NTIwLCJlbWFpbCI6ImhjbHZjbGhvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhjbHZjbGhvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.NyygcYu3lWemwX_-_AkHVG7FqRsaN222R2zJPIYDeVqClJ-pgqd5m3hHzJ-MP1poFy8PXyfWjl9M0tdF3PKj9_9msZcP0cbwKCtl36Hfw9ePv_74JjjUmCuv6wAceoeNxJJT1KORBIN7Rl3Ptc6mo6uHKDjDUXHmPdNY5fvPiex30VMXrXxlgTQV2vUjULe7mj_NHq_ET3qg_q3XdbmE9yXZQguSpbqcy32zecY-mV5PhPyqBOHyYxeR1qQpsF7XFUGLyEzUz9VXhEbneNsGFptrPcLrWTts6B6NCG2wITutt9EeQaf-NPRjnmX6J7RiA4ig7q4IxOw-cPGNB_rSrg';

// const token =
// ('AE0u-Ndm3ZmvrsyAst7wBFY0fTwuVp_KDdKL-erSxd6csYDQhjYaRI4a3r5SDBKG8vtu5uyDpLj3LWPaZ1cUUS_52jj7C362iqvXoUZuKohzlW-yXlfVTx0WTf5H0ZM_KdJahBb8UsnNC5cOTti_nY1JBIcL32vVEtXlCKTbmKRcOUiQ5WtiBCV0nbFRRbT6yHV5lJYaFaYu');
// admin
//   .auth()
//   .verifyIdToken(token)
//   .then((claims) => {
//     console.log(claims);
//   });

const mongoDB = `mongodb+srv://${config.db_user}:${config.db_pw}@${config.db_path}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    // const authHeader = req.headers.authorization || '';
    // const tokenList = authHeader.split(' ');
    // const token = tokenList[1];
    // getAuthClaims(token);
  },
});

const getAuthClaims = async (token) => {
  try {
    const claims = await admin.auth().verifyIdToken(token);
    return claims;
  } catch (err) {
    console.log(err);
  }
};

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
