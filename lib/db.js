import {MongoClient} from 'mongodb'


export async function connectToDatabase(){

    const client = await MongoClient.connect('mongodb+srv://adelinojusto911:e9OdKKD9LgIb0bMT@cluster0.ozcth.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0');
    return client;
    
  
   
}