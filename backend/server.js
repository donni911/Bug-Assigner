import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const db = process.env.DATABASE;

mongoose.connect(db).then(() => {
  console.log("Db connection is successful!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is running on port ${port}...`));
