var fs = require('fs');
const { join } = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const directories = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory)

var models = { };

// TODO in Prod we should not reload the components on every request
directories("components").forEach(function(directory) {
    var name = directory.split("/").slice(-1)[0];
    var filePath = directory + "/" + name + ".js";
    var modulePath = "./" + name + "/" + name + ".js";

    if (fs.existsSync(filePath)) {
      var model = require(modulePath);
      models[name] = model;
    }
});

module.exports = models
