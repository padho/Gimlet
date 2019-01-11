# apache-drill-node [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A JavaScript client for Apache Drill

## Installation

```sh
$ npm i @padho/gimlet
```

## Usage

```js
const {Gimlet} = require('@padho/gimlet');

let gimlet = new Gimlet({});
let data = gimlet.query(
'select * from dfs.`/Users/Patrick/Downloads/3722_geodatendeutschland_1001_20180710.csv` limit 3'
);
```
## License

Apache-2.0 © [Patrick Holl](https://www.patrick-holl.com)


[npm-image]: https://badge.fury.io/js/apache-drill-node.svg
[npm-url]: https://npmjs.org/package/apache-drill-node
[travis-image]: https://travis-ci.org/padho/apache-drill-node.svg?branch=master
[travis-url]: https://travis-ci.org/padho/apache-drill-node
[daviddm-image]: https://david-dm.org/padho/apache-drill-node.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/padho/apache-drill-node
