var fs = require('fs');
const { join } = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const directories = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory)

var build = function() {
    js = ""; 
    css = "";

    var addFromDirectory = function(directory) {
        var name = directory.split("/").slice(-1)[0];
        var jsPath = directory + "/" + name + ".js";
        var cssPath = directory + "/" + name + ".css";

        if (fs.existsSync(jsPath)) {
            js += fs.readFileSync(jsPath, 'utf8');
        }

        if (fs.existsSync(cssPath)) {
            css += fs.readFileSync(cssPath, 'utf8');
        }
    };

    directories("components").forEach(function(directory) {
        addFromDirectory(directory);
    });

    directories("pages").forEach(function(directory) {
        addFromDirectory(directory);
    });

    addFromDirectory("./global");

    fs.writeFile("./build/build.js", js, function(err) {
        if (err) {
            console.log(err);
        }
    });

    fs.writeFile("./build/build.css", css, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = { build: build };
