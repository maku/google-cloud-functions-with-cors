import * as functions from 'firebase-functions';

import * as cors from 'cors';
const corsHandler = cors({origin: true});

export const pingFunction = functions.https.onRequest((request, response) => {
  response.send(`Ping from Firebase! ${new Date().toISOString()}`);
});

export const pingFunctionWithCorsAllowed = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    response.send(`Ping from Firebase (with CORS handling)! ${new Date().toISOString()}`);
  });
});