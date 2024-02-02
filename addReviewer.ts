import { auth_return, return_ } from "./types";
import  authenticate  from "./i2auth_verification";
import axios from "axios";
import { base_url } from "./env";

const operation = async (req:any , res:any) => {
    try{
                const options = {
                    method: 'GET',
                    url: `${base_url}addreviewer/${req.body.complain_id}/${req.body.reviewer_auth_id}`
                };
                await axios
                    .request(options)
                    .then(async function ({ data }) {
                        const response: return_={
                            state:true,
                            data:{
                                data
                            }
                        }
                        res.send(response)
                    return
                    })
                    .catch(function (error: any) {
                        console.error(error);
                    });
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    try{
       
    }
    catch{
        res.send("error")
    }
}

export default operation