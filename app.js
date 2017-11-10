const express = require('express')
const tac = require('./tac/render.js')

const app = express();

app.get('/web/*', function (req, res) {
    var truePath = req.path.slice("/web/".length);
    res.send(tac.render(truePath));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
