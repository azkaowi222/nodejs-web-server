const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-By", "NodeJS");
  const port = process.env.PORT || 4000;
  const { method, url } = req;
  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Ini adalah homepage" }));
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Halo! Ini adalah halaman about" }));
    } else if (method === "POST") {
      let body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        body = JSON.parse(Buffer.concat(body).toString());
        const { name } = body;
        res.statusCode = 200;
        res.end(
          JSON.stringify({ message: `Halo, ${name} Ini adalah halaman about` })
        );
      });
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Halaman tidak ditemukan!" }));
  }
});

server.listen(port, "localhost", () => {
  console.log(`server running at http://localhost:${port}`);
});
