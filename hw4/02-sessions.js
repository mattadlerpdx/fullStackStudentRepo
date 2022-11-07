const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5001;

app.use(
  session({
    store: new session.MemoryStore(),
    resave: false,
    saveUninitialized: false,
    secret: "123",
  })
);
app.use("/", (req, res) => {
  console.log(req.session.urls)
  if (!req.session.counter){
    req.session.counter = 1;
    req.session.urls = [];
    req.session.urls.push(req.url);
  }
  else{
    req.session.counter += 1;
    req.session.urls.push(req.url);
    res.write("<p> Currently on route: " + req.url + "</p>");
    res.write(`<li>Previous Routes: ${req.session.urls}\n</li>`);
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
