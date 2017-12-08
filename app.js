const express = require('express')
const tac = require('./tac/tac.js')

const app = express();

app.use(express.static('build'));

app.get('/*', function (req, res) {
    console.log("Request: " + req.path);
    res.send(tac.render(req.path.slice(1)));
});

app.listen(3000, () => console.log('Tactile app listening on port 3000!'))
