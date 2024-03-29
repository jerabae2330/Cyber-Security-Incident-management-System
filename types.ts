import { type } from "os";

export type user={
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    userType:string,
    auth_id:string,
    private_key:string
}

export type document={
    id?:number
    private_key:string,
    reviewer_id:string,
    contact:string,
    date:string,
    device:string,
    platform:string,
    Intervention_of_law:string,
    current_status:string,
    incident_details:string
}

export type i2auth_user={
    project_code:string,
    type:string,
    email:string,
    password:string,
    api_list:Array<number>,
    device_token:string
}

export type i2auth_response={
    sate:boolean,
    data:string,
    code?:number,
    message?:number
}

export type token_body={
    userType:string,
    email:string,
    userId:string
}

export type return_= {
    state:boolean,
    data?:object
}

export type api_auth = {
    api_no:number,
    type:string
}

export type auth_res = {
    status : string,
    token?:any
    verified:boolean,
    massage:string

}

export type auth_return={
    userId:string,
    condition:boolean
}