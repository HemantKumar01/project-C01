// vim: set expandtab:
// vim: noai:ts=4:
// vim: noai:tabstop=4:
// vim: noai:shiftwidth=4:
const fs = require("fs");

function handle(res, cookies) {
    fs.readFile("./public/html/already_logged_in.html", (err, html) => {
        if (err) {
            throw err;
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" }); // TODO: "Content-Encoding": "gzip"
        res.write(html);
        res.end();
    });
}

exports.handle = handle;
