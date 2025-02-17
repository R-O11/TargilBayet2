const express = require("express");
const app = express();

function requestLogger(req, res, next) {
  const currentDate = new Date();
  console.log(`${req.method} ${req.originalUrl} ${currentDate}`);
  next();
}

function authorizationMiddleware(req, res, next) {
  const user = req.query.user;
  if (user !== "admin") {
    return res.status(403).send("Access Denied");
  }
  next();
}

app.use(requestLogger);

// הגדרת המסלולים
app.get("/", (req, res) => {
  res.send("ברוכים הבאים לדף הבית!");
});

app.get("/admin", authorizationMiddleware, (req, res) => {
  res.send("ברוכים הבאים לעמוד הניהול!");
});

app.get("/public", (req, res) => {
  res.send("זהו דף ציבורי.");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
