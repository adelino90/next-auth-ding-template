import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"; // Adjust path
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";


async function handler(req,res){
     
    if(req.method !== 'PATCH'){
        return;

    }
    const session = await getServerSession(req, res, authOptions);
  

    if(!session){
        res.status(401).json({message:'Not Authenticated'})
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();
    const userCollection = client.db().collection('users');
    const user = await userCollection.findOne({email:userEmail});
    if(!user){
        res.status(404).json({message:'User not found!'})
        client.close()
        return;
    }
    const currentPassword = user.password;
    const passwordEqual = await verifyPassword(oldPassword,currentPassword);

    if(!passwordEqual){
        res.status(403).json({message:'Password not match!'})
        client.close()
        return;
    }
    const result = await userCollection.updateOne({email:userEmail},{$set:{password:await hashPassword(newPassword)}});
    client.close();
    res.status(200).json({message:'Password Updated',result})
}
export default handler;