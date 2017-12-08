const tactileClerk = require('tactile-clerk')
const componentModels = require('./components/components.js')

tactileClerk.server.run(3000, componentModels);
