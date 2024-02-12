import axios from 'axios';
import CryptoJS from 'crypto-js';
import { i2auth_user, user } from './types';
import {run_user} from "./connection_mongo";


async function getQuotes(body:i2auth_user , req : any , res:any) {
    const client = await run_user()
	const options = {
		method: 'POST',
		url: 'https://or5u8idt71.execute-api.ap-south-1.amazonaws.com/beta/addUser',
		data: body
	};
	await axios
		.request(options)
		.then(async function ({ data }) {
			if(data.state){
                if(data.data.state){
                    console.log(data);
                    const body:user= {
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        email : req.body.email,
                        private_key: CryptoJS.MD5(req.body.email).toString(),
                        password : req.body.password,
                        userType:req.body.userType,
                        auth_id:data.data.id
                    }
                    const data_ = await client.insertOne(body);
                    console.log(data);
                    res.send("success")
                }
                else{
                    res.send(data.data.error)
                }
            }
            else{
                res.send(data.message)
            }
        return
		})
		.catch(function (error: any) {
			console.error(error);
		});
}

export default getQuotes