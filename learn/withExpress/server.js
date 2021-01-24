const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, resp) => {
  resp.send('Salut ! tu es à la racine');
});

app.listen(port);