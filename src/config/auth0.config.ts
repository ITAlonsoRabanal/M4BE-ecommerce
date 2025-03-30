const { auth } = require('express-openid-connect');
import {config as dotenvConfig} from 'dotenv'

dotenvConfig({ path: '.env'})

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_AUDIENCE
};
