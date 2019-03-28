1- create project folder
2- npm init: fill desc
3- install jshint:
npm install -g jshint
npm install --save-dev jshint

4- copy this in package.json:
 "scripts": {
    "lint": "jshint main.js"
  },
check a package.json file

5- define the path to js file in 
 "scripts": {
    "lint": "jshint app/js/main.js"
  },

4- before you test jshint, place a sample main.js file to test, then:
npm run lint

5- prepare the sass structure.
6- get a good structure of index