import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req,res){
    if(req.method !== 'POST'){
        returm
    }
    const data = req.body;
    const {email,password} = data;

    if(!email || !email.includes('@') || !password || password.trim().length < 7){
        res.status(422).json({message:'Invalid input - password should also be at least 7 characters long'})
        return;
    }
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({email:email})
    if(existingUser){
        res.status(422).json({message:'user exist already!'})
        client.close();
    }
    const result = await db.collection('users').insertOne({email:email,password:await hashPassword(password)});
    
    res.status(201).json({message:'Created User!', result:result})
    client.close();
}

export default handler;