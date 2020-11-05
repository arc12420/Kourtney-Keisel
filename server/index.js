require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const controller = require("./controller");
const app = express();
const nodemailer = require("nodemailer");


const {
  CONNECTION_STRING,
  SERVER_PORT,
  SESSION_SECRET,
  SERVER_EMAIL,
  SERVER_PASSWORD,
} = process.env;

app.use(express.json());
app.use(express.static(`${__dirname}/../build`));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SERVER_EMAIL,
    pass: SERVER_PASSWORD,
  },
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET,
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  app.set("transporter", transporter);
  console.log(`Database is connected.`);
});


// --------------------------------************----------------------ENDPOINTS--------------------***********-----------------------------------

// ------------------------------------------------------TEMPORARY ENDPOINTS-------------------------------------------------------
app.post("/api/addUser", controller.register);

// ------------------------------------------------------USER-------------------------------------------------------
app.get("/api/logout", controller.logout);
app.post("/api/user", controller.login);
app.get("/api/verify", controller.user);

// ------------------------------------------------------CONTACT/NODEMAILER-------------------------------------------------------
app.post("/api/contact", controller.contact);

// ------------------------------------------------------POSTS-------------------------------------------------------
app.get("/api/posts", controller.getAllPosts);
app.post("/api/addPost", controller.addPost);
app.put("/api/updatePost/:id", controller.updatePost);
app.delete("/api/deletePost/:id", controller.deletePost);

// ------------------------------------------------------BOOKS-------------------------------------------------------
app.get("/api/books", controller.getAllBooks);
app.post("/api/addBook", controller.addBook);
app.put("/api/updateBook/:id", controller.updateBook);
app.delete("/api/deleteBook/:id", controller.deleteBook);

// ------------------------------------------------------FREEBOOK-------------------------------------------------------
app.get("/api/freebook", controller.getFreeBook);
app.put("/api/updateFreeBook/:id", controller.updateFreeBook);

// ------------------------------------------------------ABOUT-------------------------------------------------------
app.get("/api/about", controller.getAbout);
app.put("/api/updateabout/:id", controller.updateAbout);



app.listen(SERVER_PORT, () =>
  console.log(`You are connected to port ${SERVER_PORT}.`)
);
