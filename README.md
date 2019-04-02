# Gimlet - JavaScript Client for Apache Drill

Gimlet is an open source Node.js module for Apache Drill - and the first that supports authentication. It's build using modern JavaScript and supports promises and async/await. 

## Installation

You can either use npm...
```sh
$ npm i @padho/gimlet
```

... or yarn
```sh
$ yarn add @padho/gimlet
```

## Usage
Using Gimlet is simple. Let's take a look at the following basic example:
```js
// Import Gimlet
const {Gimlet} = require('@padho/gimlet');
let data;

// Create a new Gimlet instance
let options = {
    host: '127.0.0.1', // Host
    port: 8047, // Port
    user: null, // Drill user
    password: null, // Drill user password
    ssl: false, // Use SSL
    restTimeout: 15000 // Timeout for running queries
};

let gimlet = new Gimlet(options);

try {
    data = await gimlet.query(
        'select * from dfs.`/Users/Patrick/Data/myCoolDataSet.csv` limit 3'
    );
} catch(e) {
    // Some error occured!
}

```

## API
Gimlet currently provides support for following REST APIs of Apache Drill:

```js
// ...
// Sends a query to Drill (default queryType is SQL)
gimlet.query(query, queryType);

// Lists all installed storage plugins
gimlet.getStorageList();

// Gets the config of a specific storage plugin by name
gimlet.getStoragePluginByName(name);

// Enables a specific storage plugin by name
gimlet.enableStoragePluginByName(name);

// Disables a specific storage plugin by name
gimlet.disableStoragePluginByName(name);

//Creates a new storage plugin by name and definition
gimlet.createStoragePluginByName(definition);

// Deletes a specific storage plugin by name
gimlet.deleteStoragePluginByName(name);

// Deletes a specific storage plugin by name
gimlet.deleteStoragePluginByName(name);

 // Checks if a specific storage plugin exists
gimlet.storagePluginExists(name);
```

## License

Apache-2.0 © [Patrick Holl](https://www.patrick-holl.com)
