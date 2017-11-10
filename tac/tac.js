const render = require('./render.js')
const pipeline = require('./pipeline.js')

module.exports = {
    build: pipeline.build,
    render: render.render
};
