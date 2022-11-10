const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post("/submit", (req, res) => {
  res.status(200);
  res.set({
    "Content-type": "text/html",
  });
  if (req.body) {
    let name = req.body.username;

    let email = req.body.email;

    let checkYes = req.body.answerYes;
    let checkNo = req.body.answerNo;

    res.write(`<p>Name: ${name}<p>`);
    res.write(`<p>Email: ${email}<p>`);
    if (checkYes) {
      res.write(`<p>YesSignUp: ${checkYes}<p>`);
    }
    if (checkNo) {
      res.write(`<p>NoSignUp: ${checkNo}<p>`);
    }
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
