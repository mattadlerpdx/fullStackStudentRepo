//sources: https://www.tutorialspoint.com/data-chunks-in-node-js

const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// http://localhost:5001/submit should return all the data the user entered
const form = `
<html lang="en">
<head>
  <title></title>
</head>
<body>
  <main>
    <form class="form" action="register">
      <h1 class="header">Register</h1>
      <div>
        <label class="label" for="username"> Username: </label>
        <input class="input" type="text" name="username" id="username" />
      </div>

      <div>
        <label class="label" for="email">Email:</label>
        <input class="input" type="text" name="Email" id="email" />
      </div>
      <label class="labelSignup" for="signup">Would you like to sign up for newsletter?</label>
      <div>
        <input class="inputSignupYes" type="radio" name="answer" id="yes" />
        <label for="yes">Yes, sign me up</label>
      </div>
      <div>
        <input class="inputSignupNo" type="radio" name="answer" id="no" />
        <label for="no">No, thank you</label>
      </div>
      <div>
        <input class="btn-primary" type="submit" value="Submit" />
        <input class="btn-secondary" type="reset" value="Reset" />
      </div>
    </form>
  </main>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(302, { Location: "/form" });
    res.end();
  } else if (req.url === "/form") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(form);
    res.end();
  } else if (req.url === "/submit") {
    //save data on server
    const formData= []
    req.on("data", (chunk) => {
       formData.push(chunk);
       console.log(body);
    });
    req.on("end", () => {
      // Parsing the chunk data in buffer
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // Printing the data
      console.log(message);
    });
    res.end();
  }
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
