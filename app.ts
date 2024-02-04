import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import register_user from './register_user';
import login_user from './login_user';
import add_complain from './addComplain';
import add_reviewer from './addReviewer';
import get_user from './getComplain_user';
import get_admin from './getComplain_admin';
import get_reviewer from './getComplain_reviewer';
import { auth_return } from './types';
import getAuthentication from './i2auth_verification';

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

app.post('/addcomplain', (_req, _res) => {
    add_complain(_req , _res)
});

app.get('/getuser', (_req, _res) => {
    get_user(_req , _res)
});

app.get('/getreviewer', (_req, _res) => {
    get_reviewer(_req , _res)
});

app.get('/getadmin', (_req, _res) => {
    get_admin(_req , _res)
});

app.post('/addreviewer', (_req, _res) => {
    add_reviewer(_req , _res)
});

app.get('/auth_api',async (_req, _res) => {
    try{
        let validity:auth_return = await getAuthentication(_req , "1")
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
