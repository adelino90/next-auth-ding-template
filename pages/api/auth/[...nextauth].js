import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";



export default NextAuth({
    session:{
        strategy: 'jwt', // Ensure the strategy is set correctly
        jwt:true
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // Use the same secret
    },
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
                async authorize(credentials,req){
                    const client = await connectToDatabase();
                    const usersCollection = client.db().collection('users');

                    const user = await usersCollection.findOne({email:credentials.email})
                    console.log("TEST DITO")
                    if(!user){
                        client.close()
                        throw new Error('No user found!')
                    }
                    const userValid = await verifyPassword(credentials.password,user.password);
                    if(!userValid){
                        client.close()
                        throw new Error('Invalid user')
                    }

                    return {email:user.email};
                    client.close()
                    
             
                }
            
        })
    ]
});