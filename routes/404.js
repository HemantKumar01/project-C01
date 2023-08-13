// vim: set expandtab:
// vim: noai:ts=4:
// vim: noai:tabstop=4:
// vim: noai:shiftwidth=4:
const fs = require("fs");

function handle(res) {
    fs.readFile("./public/html/404.html", (err, html) => {
        if (err) {
            throw err;
            return;
        }
        res.writeHead(404, { "Content-Type": "text/html" }); // TODO: "Content-Encoding": "gzip"
        res.write(html);    
        res.end();
    });
}

exports.handle = handle;
