import { ObjectId } from "mongodb";
import {run_user , run_credentials} from "./connection_mongo";
import { auth_return, document, return_ } from "./types";
import  authenticate  from "./i2auth_verification";
import axios from "axios";
import { base_url } from "./env";

const operation = async (req:any , res:any) => {
    try{
        let validity:auth_return = await authenticate(req , "1")
        console.log(validity)
        if (!validity.condition){
            res.send("not valid")
            return
        }
        else{
             const client = await run_user()
        const client2 = await run_credentials()
        const data_ = await client.findOne({'auth_id':validity.userId});
        console.log(data_);
        if(data_ == null){
            res.send("Error auth_id")
        }
        else{
            const data_2 = await client2.findOne({'_id':new ObjectId('65bbe02c449996986fe48bc8')});
            if(data_2 == null){
                res.send("Internal Error")
            }
            else{
                console.log(data_)
                const body:document= {
                    id:data_2.nex_doc_id,
                    private_key:data_.private_key,
                    reviewer_id:"",
                    contact:req.body.contact,
                    date:req.body.date,
                    device:req.body.device,
                    platform:req.body.platform,
                    Intervention_of_law:req.body.intervention,
                    current_status:req.body.current_status,
                    incident_details:req.body.incident_details
                }
                const options = {
                    method: 'POST',
                    url: `${base_url}addcomplain`,
                    data: body
                };
                await axios
                    .request(options)
                    .then(async function ({ data }) {
                        if(data.state){
                            const doc_id = data_2.nex_doc_id + 1
                            await client2.updateOne({'_id':new ObjectId('65bbe02c449996986fe48bc8')},{'$set':{'nex_doc_id':doc_id}})
                            const response: return_={
                                state:true,
                                data:{
                                    body
                                }
                            }
                            res.send(response)
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
        }
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