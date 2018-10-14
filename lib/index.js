'use strict';

const axios = require('axios');

class Drill {
  constructor(args) {
    if (!args) {
      args = {};
    }

    this.host = args.host || 'localhost';
    this.port = args.port || 8047;
    this.user = args.user || process.env.USER;
    this.ssl = args.ssl || false;
    this.restTimeout = args.restTimeout || 15000;

    if (this.ssl) {
      this.protocol = 'https';
    } else {
      this.protocol = 'http';
    }
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      'User-Name': this.user
    };
  }

  async query(query, queryType = 'SQL') {
    let headers = this._getHeaders();
    let baseUrl = this.protocol + '://' + this.host + ':' + this.port + '/';

    const axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: this.restTimeout,
      headers: headers
    });

    let response = axiosInstance.post('query.json', {
      query: query,
      queryType: queryType
    });

    try {
      response = await response;
      console.log(response.data);
    } catch (error) {
      console.log('error');
    }
  }

  go() {
    console.log('LOOL');
  }
}

let drill = new Drill({
  host: 'localhost',
  port: 8047,
  ssl: false,
  user: 'Patrick'
});

drill.query(
  'select * from dfs.`/Users/Patrick/Downloads/3722_geodatendeutschland_1001_20180710.csv` limit 3'
);

// Export default { Drill };

module.exports = { Drill };
