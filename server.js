require("dotenv").config();
const { dbConnection } = require("./database/config");
const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const gifRoutes = require("./routes/gifRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

dbConnection();

// routes

app.use("/gifs", gifRoutes);
app.use("/user", userRoutes);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT... ${process.env.PORT || 5000}`);
});