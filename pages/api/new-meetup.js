import dbConnect from "../../utils/dbConnect";

// These JS files are not about defining, rendering or returning React Component
// Instead it define functions that contain server-side code, cuz they only
// run on Server, Never on the Client. and can use credentials here, without
// compromising them.

// /api/new-meetup ===> URL of the file
// ===> request sent to this URL triggers the function defined here

async function handler(req, res) {
  // only POST requests in this route will trigger in here
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;

    try {
      const { client, meetupsCollection } = await dbConnect();
      const result = await meetupsCollection.insertOne(data);
  
      console.log(result);
      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    }
    catch (err) {
      console.log("Error: ", err);
    }
  }
}

export default handler;
