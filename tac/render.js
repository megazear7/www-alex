var fs = require('fs');
var Mustache = require('Mustache');
const { join } = require('path')

var path = process.argv[2];
var page = JSON.parse(fs.readFileSync('content.json', 'utf8'));

path.split("/").forEach(function (val) {
  page = page[val];
});

var componentTemplates = {
};

const isDirectory = source => fs.lstatSync(source).isDirectory()
const componentDirectories = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory)

componentDirectories("components").forEach(function(directory) {
    var componentName = directory.split("/").slice(-1)[0];
    var componentTemplate = directory + "/" + componentName + ".html";
    componentTemplates[componentName] = fs.readFileSync(componentTemplate, 'utf8');
});

var html = "<html>\n<head>\n</head>\n<body>";

Object.keys(page["content"]).forEach(function(componentName) {
    var template = componentTemplates[componentName]
    var metadata = page["content"][componentName];

    metadata.page = page

    var componentHtml =  Mustache.render(template, metadata, componentTemplates);

    html += "\n" + componentHtml;
});

html += "</body>\n</html>";

console.log(html);
