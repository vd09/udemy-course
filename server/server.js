const express=require("express");
const app = express();
const cors = require("cors")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000;

app.use(cors());
connectDB();

app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productApi"));
app.use("/api/auth", require("./routes/authApi"));

app.get("/", (req, res) => {
    res.send("My app is up");
});

app.listen(PORT, () => {
    console.log(`server is listenning at port ${PORT}`);
});
// ----------------------------------------------------------

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://vikrantdhawan9:<password>@cluster0.qwdkxj9.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// vikrantdhawan9
// iEKuJB2yO6dxB43d
// FzxoNdzCjrRfhkC5
// 49.37.170.72/32
// mongodb+srv://vikrantdhawan9:<password>@cluster0.qwdkxj9.mongodb.net/test