import {run_user} from "./connection_mongo";
import getQuotes from "./i2auth";
import { i2auth_response, i2auth_user, user } from "./types";

const operation = async (req:any , res:any) => {
    try{
        const client = await run_user()
        const data_ = await client.findOne({'email':req.body.email});
        console.log(data_);
        if(data_ != null){
            res.send("Alredy Registered")
        }
        else{
            const body_:i2auth_user= {
                project_code:"6543d314d9850e2dd50661c1AVT60UVT8600",
                type:req.body.userType,
                email :req.body.email,
                password :req.body.password,
                device_token:"",
                api_list:req.body.userType == "user"?[1]:[2]
            }
            await getQuotes(body_ , req , res)
            return
        }
    }
    catch{
        res.send("error")
    }
}

export default operation