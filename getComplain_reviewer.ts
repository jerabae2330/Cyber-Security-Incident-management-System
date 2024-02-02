import { auth_return, return_ } from "./types";
import  authenticate  from "./i2auth_verification";
import axios from "axios";
import { base_url } from "./env";

const operation = async (req:any , res:any) => {
    try{
        let validity:auth_return = await authenticate(req , "2")
        console.log(validity)
        if (!validity.condition){
            res.send("not valid")
            return
        }
        else{
                const options = {
                    method: 'GET',
                    url: `${base_url}getreviewer/${validity.userId}`
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