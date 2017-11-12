var fs = require('fs');
var Mustache = require('Mustache');
const { join } = require('path')

var render = function(path) {
    var page = JSON.parse(fs.readFileSync('content.json', 'utf8'));
    var home = page;

    var containingPage = function(json) {
        while(json != undefined && json.tacType != "page") {
            json = json.parent;
        }

        return json;
    };

    var addReferences = function(json) {
        for(var key in json) {
            if (key != "siblings" && key != "home" && key != "parent" && key != "page" && typeof json[key] === "object") {
                json[key].parent = json;
                json[key].path = json.path + "/" + key;

                if (json[key].tacType != "page") {
                    json[key].page = containingPage(json[key]);
                } else {
                    json[key].home = home;
                }

                addReferences(json[key])
            }
        }
    };

    page.path = "";
    page.home = home;
    addReferences(page);

    console.log(page);

    var pathParts = path.split("/");

    if (path.length > 0) {
        pathParts.forEach(function (val) {
            page = page[val];
        });
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
        this.render = render;

        return Mustache.render('{{> ' + this.compType  + '}}', this, componentTemplates);
    };

    page.render = render 

    return Mustache.render(pageTemplates[page.pageType], page, componentTemplates);
};

module.exports = { render: render };
