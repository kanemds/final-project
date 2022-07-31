const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");

    app.listen(3001, () => {
      console.log(`Server listening on ${3001}`);
    });
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

const routes = require("./routes/routes");

app.use("/", routes);

app.use("/", routes);
