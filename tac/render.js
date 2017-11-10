var fs = require('fs');
var Mustache = require('Mustache');
const { join } = require('path')

var path = process.argv[2];
var page = JSON.parse(fs.readFileSync('content.json', 'utf8'));

path.split("/").forEach(function (val) {
  page = page[val];
});

var componentTemplates = {};
var pageTemplates = {};

const isDirectory = source => fs.lstatSync(source).isDirectory()
const directories = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory)

directories("components").forEach(function(directory) {
    var name = directory.split("/").slice(-1)[0];
    var template = directory + "/" + name + ".html";
    componentTemplates[name] = fs.readFileSync(template, 'utf8');
});

directories("pages").forEach(function(directory) {
    var name = directory.split("/").slice(-1)[0];
    var template = directory + "/" + name + ".html";
    pageTemplates[name] = fs.readFileSync(template, 'utf8');
});

var render;

render = function() {
    this.page = page;
    this.render = render;

    return Mustache.render('{{> ' + this.compType  + '}}', this, componentTemplates);
};

page.render = render 

var html =  Mustache.render(pageTemplates[page.pageType], page, componentTemplates);

console.log(html);
