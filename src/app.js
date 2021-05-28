import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import admin from 'firebase-admin';
import schema from './schema';
import resolvers from './resolvers';
import dotenv from 'dotenv';
import elasticClient from './elasticsearch-client';

dotenv.config();
const config = {
  db_user: process.env.DB_USER,
  db_pw: process.env.DB_PW,
  db_path: process.env.DB_PATH,
  port: process.env.PORT,
  host: process.env.HOST,
};

// var serviceAccount = require('../golaiba-dev-firebase-adminsdk-452on-8bb9900fc4.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const token =
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiYWNjZXNzTGV2ZWwiOjEwLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhZHNsaW5lLWRldiIsImF1ZCI6InJlYWRzbGluZS1kZXYiLCJhdXRoX3RpbWUiOjE1OTE2MjU5MjAsInVzZXJfaWQiOiJVM2ZtWGI5djBEYVhlelpDTnNNajVJTXRoRTQzIiwic3ViIjoiVTNmbVhiOXYwRGFYZXpaQ05zTWo1SU10aEU0MyIsImlhdCI6MTU5MTYyNTkyMCwiZXhwIjoxNTkxNjI5NTIwLCJlbWFpbCI6ImhjbHZjbGhvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhjbHZjbGhvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.NyygcYu3lWemwX_-_AkHVG7FqRsaN222R2zJPIYDeVqClJ-pgqd5m3hHzJ-MP1poFy8PXyfWjl9M0tdF3PKj9_9msZcP0cbwKCtl36Hfw9ePv_74JjjUmCuv6wAceoeNxJJT1KORBIN7Rl3Ptc6mo6uHKDjDUXHmPdNY5fvPiex30VMXrXxlgTQV2vUjULe7mj_NHq_ET3qg_q3XdbmE9yXZQguSpbqcy32zecY-mV5PhPyqBOHyYxeR1qQpsF7XFUGLyEzUz9VXhEbneNsGFptrPcLrWTts6B6NCG2wITutt9EeQaf-NPRjnmX6J7RiA4ig7q4IxOw-cPGNB_rSrg';

// const token =
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwMjUxYWIxYTJmYzFkMzllNDMwMWNhYjc1OTZkNDQ5ZDgwNDI1ZjYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2hpIEx1bmcgSE8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0zY1F2NlJ5QVpiUS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNsYVpOYWVPOURzWmRsVmNrdkdsY3FlNFFJRWp3L3M5Ni1jL3Bob3RvLmpwZyIsInJvbGUiOlsiYWRtaW4iXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2dvbGFpYmEtZGV2IiwiYXVkIjoiZ29sYWliYS1kZXYiLCJhdXRoX3RpbWUiOjE2MjIxOTY2MjUsInVzZXJfaWQiOiJFRDdvMkJtYlpDZ2NIU2thWXBhZFd1NUM5bkQyIiwic3ViIjoiRUQ3bzJCbWJaQ2djSFNrYVlwYWRXdTVDOW5EMiIsImlhdCI6MTYyMjIwNzYwMywiZXhwIjoxNjIyMjExMjAzLCJlbWFpbCI6InZjbGhvQGNvbm5lY3QuaGt1LmhrIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDU3ODM2NDk2MDYwMzMwNTcyODIiXSwiZW1haWwiOlsidmNsaG9AY29ubmVjdC5oa3UuaGsiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.b4Ig8fKDoYwK-L6qkaFZjun-NcXmF8rKKdctT8cX12L3htLjAuUpQ6XkF4Z41IPcQBW4NA4YP5K_d-M0GjVwnyaTKienNyZfqICyw4_xrTN_h9o-T-uGyMB_V2v_8Hm7iC_GHvUHxEdpofhL2jjNlsPUfoRQ3_R2ODuPtaTTLeKG_Zhw1Xj5l1ipu-s7tF9P0WVj04G18n5czHrViYTOGXPS_YQ3WPkVsYlt6fNZw5cVRaP9KOUT9XAW9QatDGBS1ik7k_WolLqHiESDUWozDm9o5i-LFLarQoYq9OT358svLgINLPIbfWJ4L_ZQ8zQkIZGuC_hJJSL0iLMbkaWZ9w';
// admin
//   .auth()
//   .verifyIdToken(token)
//   .then((claims) => {
//     console.log(claims);
//     // if (claims.admin === true) {
//     //   console.log('Yeahhhhhhh!!!!!!!!');
//     // }
//   });

// admin
//   .auth()
//   .setCustomUserClaims('ED7o2BmbZCgcHSkaYpadWu5C9nD2', { role: ['admin'] })
//   .then(() => {
//     console.log('done');
//   });

const mongoDB = `mongodb+srv://${config.db_user}:${config.db_pw}@${config.db_path}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

// const elasticClient = new Client({
//   node:
//     'https://search-golaiba-dev-es-a2dpnpq3jbbmbhn73k23cg7hm4.us-east-1.es.amazonaws.com',
//   auth: {
//     username: 'golaiba-dev',
//     password: 'Golaiba-dev0336',
//   },
// });

// const getResult = async () => {
//   const result = await elasticClient.search({
//     index: 'movies',
//     body: {
//       query: {
//         match: { year: 2010 },
//       },
//     },
//   });
//   console.log(result);
//   console.log(result.body.hits.hits);
// };
// const getResult = async () => {
//   const result = await elasticClient.index({
//     index: 'test',
//     id: '1',
//     body: {
//       character: 'Ned Stark',
//       quote: 'Winter is coming.',
//       times: 0,
//     },
//   });
//   console.log(result);
// };

// getResult();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(cors());

app.get('/health_check', function (req, res) {
  res.send('ok');
});

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
    console.log(claims);
    return claims;
  } catch (err) {
    console.log(err);
  }
};

// getAuthClaims(token);

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
