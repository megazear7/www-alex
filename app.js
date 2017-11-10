const express = require('express')
const tac = require('./tac/tac.js')

const app = express();

tac.build();
app.use(express.static('build'));

app.get('/web/*', function (req, res) {
    var truePath = req.path.slice("/web/".length);

    res.send(tac.render(truePath));
});

app.listen(3000, () => console.log('Tactile app listening on port 3000!'))
