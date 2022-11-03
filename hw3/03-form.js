const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
const server = http.createServer((req, res) => {
  const routes = [
    "form",
    "submit"
  ];

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };
  if (req.url === "/") {
    let routeResults = getRoutes();
  }
})
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
