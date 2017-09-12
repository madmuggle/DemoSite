const http = require("http");
const fs = require("fs");

const { path, filename } = require("./webpack.config.js").output;
const bundle = path + filename;


function openStream(path) {
  const fName = (path.indexOf(".js") === -1) ? "./www/index.html" : bundle;
  return fs.createReadStream(fName);
}

http.createServer((req, res) => openStream(req.url).pipe(res))
.listen(8080);

