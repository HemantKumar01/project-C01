// vim: set expandtab:
// vim: noai:ts=4:
// vim: noai:tabstop=4:
// vim: noai:shiftwidth=4:
const http = require("http");
const fs = require("fs");

// Routes
const indexRoute = require("./routes/index.js");
const loginRoute = require("./routes/login.js");
const registerRoute = require("./routes/register.js");
const already_logged_in = require("./routes/already_logged_in.js");
const _404Route = require("./routes/404.js");

const PORT = process.env.PORT || 8000;

//listing css files
const css_files = fs.readdirSync("./public/css/").map((file) => {
  return "/public/css/" + file;
});
const js_files = fs.readdirSync("./public/js/").map((file) => {
  return "/public/js/" + file;
});

const server = http.createServer(async (req, res) => {
  console.log();
  if ("user-agent" in req.headers) {
    console.log(
      `Request received from User-Agent: ${req.headers["user-agent"]}`
    );
  }

  if (req.method === "GET") {
    if (req.url === "/" || req.url === "/index.html") {
      indexRoute.handle(res);
    } else if (req.url === "/login") {
      if ("cookie" in req.headers) {
        console.log(req.headers);
        already_logged_in.handle(res);
      }
      loginRoute.handle(res);
    } else if (req.url === "/register") {
      registerRoute.handle(res);
    } else if (js_files.includes(req.url)) {
      fs.readFile("." + req.url, (err, js) => {
        if (err) {
          throw err;
          return;
        }
        res.writeHead(200, { "Content-Type": "text/javascript" }); // TODO: "Content-Encoding": "gzip"
        res.write(js);
        res.end();
      });
    }
    //allowing all files in css directory
    else if (css_files.includes(req.url)) {
      fs.readFile("." + req.url, (err, js) => {
        if (err) {
          throw err;
          return;
        }
        res.writeHead(200, { "Content-Type": "text/css" }); // TODO: "Content-Encoding": "gzip"
        res.write(js);
        res.end();
      });
    } else {
      _404Route.handle(res);
    }
  } else if (req.method === "POST") {
    req.on("data", (chunk) => {
      console.log(`Received data: ${chunk}`);
      //firebase manages login cookies automatically and keeps them in sync with database
      // res.writeHead(303, { Location: "/", "Set-Cookie": chunk });
      // res.end();
    });
    req.on("end", () => {
      console.log("POST data ended");
    });
  } else {
    console.log(`Encountered unknown method: ${req.method}`);
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
