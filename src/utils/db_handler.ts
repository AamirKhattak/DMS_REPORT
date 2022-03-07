require('dotenv').config()
import * as ibmdb from "ibm_db";

let {DATABASE, HOSTNAME, PORT, PROTOCOL, UID, PWD} = process.env;

let connStr:string =  `DATABASE=${DATABASE};HOSTNAME=${HOSTNAME};PORT=${PORT};PROTOCOL=${PROTOCOL};UID=${UID};PWD=${PWD}`;

export default async function getIBMDBConn() {
  try{      
    let conn = await ibmdb.open(connStr);
    return conn;
  }catch (err){
    console.log(err);
    throw Error(`error connecting database, ${err}`);
  }  
}

