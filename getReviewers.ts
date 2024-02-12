import {run_user} from "./connection_mongo";

const operation = async (req:any , res:any) => {
    try{
        const client = await run_user()
        const data_ = await client.find({'userType':'reviewer'}).toArray();
        console.log(data_);
        if(data_ == null){
            res.send("Error auth_id")
        }
        else{
            const response = {
                "state":true,
                "data":data_
            }
            res.send(response)
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
}

export default operation