const express = require("express");
const cors = require("cors");
const MongooseConnection = require("./utility/mongoose.connection");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
//const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

// Create application with express
const app = express();

// Connect to database
MongooseConnection();

// Middlewares
//app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// const PORT = process.env.PORT || 8000;

const PORT = 4050 || 8000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// serving the frontend
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/assistants", require("./routes/assistant.routes"));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
