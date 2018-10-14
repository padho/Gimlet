'use strict';

const axios = require('axios');

class Gimlet {
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
    let data = null;
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
      data = response.data;
    } catch (error) {
      throw error;
    }

    return data;
  }
}

/*
Let gimlet = new Gimlet({
  host: 'localhost',
  port: 8047,
  ssl: false,
  user: 'Patrick'
});

// 'select * from dfs.`/Users/Patrick/Downloads/3722_geodatendeutschland_1001_20180710.csv` limit 3'
let data = gimlet.query(
  'select * from mongoCool.midas.enrich_data_6y6zxda8z9hl8qqfd0y18 limit 5'
);

data
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  });

// Export default { Drill };
*/

module.exports = { Gimlet };
