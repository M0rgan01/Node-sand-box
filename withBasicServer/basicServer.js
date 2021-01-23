let http = require('http');
let url = require('url');

let basicServer = http.createServer();

basicServer.on('request', (req, resp) => {

  const parsedUrl = url.parse(req.url, true).query;

  resp.writeHead(200, {
    'Content-type': 'text/html; charset=utf-8',
  });

  resp.end('Salut comment ça va ? ' + (parsedUrl.name ? parsedUrl.name : 'anonyme'));
});

basicServer.listen(8080);