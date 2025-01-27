import { getSession } from "next-auth/react";


async function handler(req,res){
     
    if(req.method !== 'PATCH'){
        return;

    }
    const session = await getSession({req:req});
    if(!session){
        res.status(401).json({message:'Not Authenticated'})
        return;
    }

}
export default handler;