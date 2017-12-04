var fs = require('fs');
var Handlebars = require('Handlebars');
const { join } = require('path')
const componentModels = require('../components/components.js')

var render = function(path) {
    var page = JSON.parse(fs.readFileSync('content.json', 'utf8'));
    var home = page;
    home.isHome = true;
    home.nodeName = "";

    var isSafe = function(key, json) {
      return ["children", "siblings", "home", "parent", "page"].indexOf(key) == -1 && typeof json[key] === "object";
    };

    var children = [ ];
    for (var childrenName in home) {
      if (isSafe(childrenName, home) && home[childrenName].tacType === "page") {
        children.push(home[childrenName]);
      }
    }
    home.children = children;

    var containingPage = function(json) {
        while(json != undefined && json.tacType != "page") {
            json = json.parent;
        }

        return json;
    };

    var addReferences = function(json) {
        for(var key in json) {
            if (isSafe(key, json)) {
                json[key].parent = json;
                json[key].path = json.path + "/" + key;
                json[key].nodeName = key;

                if (json[key].tacType != "page") {
                    json[key].page = containingPage(json[key]);
                } else {
                    var siblings = [ ];
                    for (var siblingName in json) {
                      if (isSafe(siblingName, json) && json[siblingName].tacType === "page" && siblingName != key) {
                        siblings.push(json[siblingName]);
                      }
                    }

                    var children = [ ];
                    for (var childrenName in json[key]) {
                      if (isSafe(childrenName, json[key]) && json[key][childrenName].tacType === "page") {
                        children.push(json[key][childrenName]);
                      }
                    }

                    json[key].siblings = siblings;
                    json[key].children = children;
                    json[key].home = home;
                }

                addReferences(json[key])
            }
        }
    };

    page.path = "";
    page.home = home;
    addReferences(page);

    var pathParts = path.split("/");
    if (path.length > 0) {
        pathParts.forEach(function (val) {
            page = page[val];
        });
    }

    home.path = "/";

    if (typeof page === "undefined") {
      // TODO Return the correct 404 HTTP response.
      throw new Error("Page Not Found");
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

        Handlebars.registerPartial(name, fs.readFileSync(template, 'utf8'));
        componentTemplates[name] = Handlebars.compile(fs.readFileSync(template, 'utf8'));
    });

    // TODO in Prod we should not reload the components on every request
    directories("pages").forEach(function(directory) {
        var name = directory.split("/").slice(-1)[0];
        var template = directory + "/" + name + ".html";
        pageTemplates[name] = fs.readFileSync(template, 'utf8');
    });

    /* If nodeName is false, then we assume that the current node is the actual
     * node. I.e there is no sub node.
     * If param2 is a string we assume this defines the compType. Otherwise we
     * assume that the compType equals the nodeName. */
    Handlebars.registerHelper('render', function(nodeName, param2) {
      // TODO if the first parameter is an object, use that as the subNode.
      
      var compType = nodeName;
      if (typeof param2 === "string") {
        compType = param2;
      }

      if (nodeName && typeof this[nodeName] === "undefined") {
        this[nodeName] = { compType: compType };
        addReferences(this);
      }

      var subNode;
      if (nodeName === false) {
        subNode = this;
      } else {
        subNode = this[nodeName];
      }

      var componentModel = componentModels[subNode.compType];

      if (typeof componentModel !== "undefined") {
        subNode.model = componentModels[subNode.compType].init(subNode);
      }

      return new Handlebars.SafeString(componentTemplates[subNode.compType](subNode));
    });

    return Handlebars.compile(pageTemplates[page.pageType])(page);;
};

module.exports = { render: render };
