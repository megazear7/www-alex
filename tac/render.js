var fs = require('fs');

var path = process.argv[2];

console.log(path);

var content = JSON.parse(fs.readFileSync('content.json', 'utf8'));

path.split("/").forEach(function (val) {
  content = content[val];
});

console.log(content);

var html = "<html>\n<head>\n</head>\n<body>";

Object.keys(content["content"]).forEach(function(componentName) {
    var component = content["content"][componentName];

    var componentTemplate = fs.readFileSync('components/'+component.compType+'/'+component.compType+'.html' , 'utf8');

    var componentHtml = generate(componentTemplate);

    html += "\n" + componentHtml;
});

function generate(template) {
    var html = "";

    var str = "I learned to play the Ukulele in Lebanon."
    var regex = /div/g, result, indices = [];

    while ( (result = regex.exec(str)) ) {
        console.log(result.index)
        console.log(result)
    }

    return template;
}

html += "</body>\n</html>";

console.log(html);
