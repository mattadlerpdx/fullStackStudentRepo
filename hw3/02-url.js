const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    "/attributes?hello=world&lorem=ipsum",
    "/items?first=1&second=2&third=3&fourth=4",
    "/characters?spongebob=squarepants&patrick=star&sandy=cheeks",
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);
  //create new params Object
  let params = new URLSearchParams(url.search);
  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === "/") {
    let routeResults = getRoutes();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  }
else if (url.pathname === "/attributes") {
    params.forEach(function (value, key) {
      tabl = `<td style='border: 5px solid black;'>${key}</td>
              <td style='border: 5px solid black;'>${value}</td>
                 `;
      res.write(`<table style='border: 5px solid black;'> ${tabl} </table>`);
    });
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
