var fs = require('fs');
var Mustache = require('Mustache');
const { join } = require('path')

var render = function(path) {
    var page = JSON.parse(fs.readFileSync('content.json', 'utf8'));
    var home = page;
    var parent = page;
    var pathParts = path.split("/");

    if (path.length > 0) {
        pathParts.forEach(function (val) {
            page = page[val];
        });

        var parentPathParts = pathParts;
        parentPathParts.pop();

        if (parentPathParts.length > 0) {
            parentPathParts.forEach(function (val) {
                parent = page[val];
            });
        }
    } else {
        parent = { };
    }

    var componentTemplates = {};
    var pageTemplates = {};

    const isDirectory = source => fs.lstatSync(source).isDirectory()
    const directories = source =>
      fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory)

    // TODO in Prod we should not reload the components on every request
    directories("components").forEach(function(directory) {
        var name = directory.split("/").slice(-1)[0];
        var template = directory + "/" + name + ".html";
        componentTemplates[name] = fs.readFileSync(template, 'utf8');
    });

    // TODO in Prod we should not reload the components on every request
    directories("pages").forEach(function(directory) {
        var name = directory.split("/").slice(-1)[0];
        var template = directory + "/" + name + ".html";
        pageTemplates[name] = fs.readFileSync(template, 'utf8');
    });

    var render;

    render = function() {
        this.page = page;
        this.page.home = home;
        this.page.parent = parent;
        this.page.siblings = [ ];
        this.page.children = [ ];

        for(var key in this.page) {
            if (key != "parent" && this.page[key].tacType === "page") {
                this.page.children.push(this.page[key]);
            }
        }

        for(var key in this.page.parent) {
            if (key != "parent" && this.page.parent[key].tacType === "page") {
                this.page.siblings.push(this.page.parent[key]);
            }
        }

        this.render = render;

        return Mustache.render('{{> ' + this.compType  + '}}', this, componentTemplates);
    };

    page.render = render 

    return Mustache.render(pageTemplates[page.pageType], page, componentTemplates);
};

module.exports = { render: render };
