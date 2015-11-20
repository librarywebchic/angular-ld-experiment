# AngularJS Linked Data Experiment

A demonstration application using AngularJS and rdflib.js to parse and display Linked Data from OCLC. 

## Installation

### Step 1: Install from GitHub

In a Terminal Window

```bash
$ cd {YOUR-APACHE-DOCUMENT-ROOT}
$ git clone https://github.com/librarywebchic/angular-ld-experiment.git
$ cd angular-ld-experiment
```

### Step 2: Install NPM
Go to http://nodejs.org/ download and install Node.js

### Step 3: Use NPM, Bower, and Grunt to install the dependencies


```bash
$ npm install
$ npm install -g bower
$ npm install -g grunt-cli
$ bower install
$ grunt

```

[NPM](https://www.npmjs.com/) is a dependency management library for Javascript. It is used to install the required libraries for testing and parsing RDF data. The server-side dependencies are configured in the file `package.json`.

[Bower](http://bower.io/) is a dependency management library for Javascript. It is used to install the required client-side libraries for testing and parsing RDF data. The dependencies are configured in the file `bower.json`.
[Grunt](https://getcomposer.org/doc/00-intro.md) is a dependency management library for PHP. It is used to install the required libraries for testing and parsing RDF data. The dependencies are configured in the file `http://gruntjs.com`.

## Usage

To run the app, point your web browser at the localhost address where these instructions will install it by default. 

[http://localhost/angular-ld-experiment/](http://localhost/angular-ld-experiment/)