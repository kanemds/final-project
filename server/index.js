const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);
const app = express();
const StudentModel = require("./models/extra/student");
const TeacherModel = require("./models/teacher");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

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

const store = new MongodbSession({
  uri: process.env.MONGODB_URI,
  collection: "session",
});

const allowlist = ["http://localhost:3000", process.env.APP_HOST];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  let isDomainAllowed = allowlist.indexOf(req.header("Origin")) !== -1;
  let isExtensionAllowed = req.path.endsWith(".jpg");

  if (isDomainAllowed && isExtensionAllowed) {
    // Enable CORS for this request
    corsOptions = { origin: true };
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(
  session({
    secret: "secret",
    store: store,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // one week
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.post("/student/login", async (req, res) => {
  const { user } = req.body;

  let student = await StudentModel.findOne({ user });
  if (!student) {
    return res.redirect("/");
  }
  req.session.user = student._id;
  res.json(student);
});

app.post("/teacher/login", async (req, res) => {
  const { user } = req.body;

  let teacher = await TeacherModel.findOne({ user });
  if (!teacher) {
    return res.redirect("/");
  }
  req.session.teacherId = teacher._id;
  res.json(teacher);
});

app.use("/", routes);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.post("/student/login", async (req, res) => {
  const { user } = req.body;

  let student = await StudentModel.findOne({ user });
  if (!student) {
    return res.redirect("/");
  }
  req.session.user = student._id;
  res.json(student);
});

app.post("/teacher/login", async (req, res) => {
  const { user } = req.body;

  let teacher = await TeacherModel.findOne({ user });
  if (!teacher) {
    return res.redirect("/");
  }
  req.session.teacherId = teacher._id;
  res.json(teacher);
});
