import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import register_user from './register_user';
import login_user from './login_user';
import { auth_return } from './types';
import { authenticate } from './authentication/authenticate_token';
import {print} from './utils'
import getQuotes from './i2auth';

const app: express.Application = express();
const port: number = 3000;
app.use(cors())
app.use(bodyParser.json())
app.get('/', (_req, _res) => {
    console.log(_req.params)
    _res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});

app.post('/login', (_req , _res) => {
    login_user(_req , _res)
});

app.post('/register', (_req, _res) => {
    register_user(_req , _res)
});

app.get('/auth_api',async (_req, _res) => {
    try{
        let validity:auth_return = await authenticate(_req , 1)
        console.log(validity)
        if (!validity.condition){
            _res.send("not valid")
            return
        }
        else{
            _res.send("valid")
        }
    }
    catch{
        console.log("catch")
        _res.send("not valid")
        return
    }
});

app.listen(port,async () => {
    console.log(`TypeScript with Express
        http://localhost:${port}/`);
});
