import { MongoClient } from "mongodb"

const dbConnect = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://marium:marium27@cluster0.q2val.mongodb.net/meetups_db?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  return { client, meetupsCollection };
}

export default dbConnect;