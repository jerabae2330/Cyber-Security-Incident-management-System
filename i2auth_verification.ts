import axios from 'axios';
import CryptoJS from 'crypto-js';
import { auth_return, i2auth_user, user } from './types';
import {run_user} from "./connection_mongo";


async function getAuthentication(req : any,api_no:string) {
    let tokenHeaderKey = "token"
    const token = req.header(tokenHeaderKey)
    const client = await run_user()
	const options = {
        method: 'GET',
        url: `https://or5u8idt71.execute-api.ap-south-1.amazonaws.com/beta/userAuth/${api_no}`,
        headers: {
            'project_code': '6543d314d9850e2dd50661c1AVT60UVT8600', 
            'token': token,
        },
    };
    
    try {
        const response = await axios.request(options);
        let auth_res : auth_return = {
            userId:response.data.data.code,
            condition:true
        }
        if(!response.data.data.state){
            auth_res.condition = false
        }
        return auth_res
    } catch (error:any) {
        console.error('Error:', error.message);
        let auth_res : auth_return = {
            userId:"",
            condition:false
        }
        return auth_res
    }
}
export default getAuthentication