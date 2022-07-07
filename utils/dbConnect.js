import { MongoClient } from "mongodb"

// ==> 1.
// While deploying the app, one shouldn't put these credentials
// hard-coded here. make enviromental variables, (although it is save
// from security prospective but) its good practice to seperate 
// development and production database

// ==> 2.
// For hosting, Vercel is a great hosting provider for Next JS app
// cuz vercel is a hosting provider by the same team that develop
// Next JS, So its really embracing and optimized for Next JS. 

// ==> 3.
// ---> npm run dev -- runs development build on localhost
// ---> npm run build -- create production build for deployment (not
// needed while deploying on vercel, but for other hosting providers)
// ---> npm run start -- runs production ready build on localhost

const dbConnect = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://marium:marium27@cluster0.q2val.mongodb.net/meetups_db?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  return { client, meetupsCollection };
}

export default dbConnect;