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

    this.baseUrl = this.protocol + '://' + this.host + ':' + this.port + '/';
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      'User-Name': this.user
    };
  }

  _getAxiosInstance() {
    let headers = this._getHeaders();

    console.log(this.baseUrl);

    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.restTimeout,
      headers: headers
    });

    return axiosInstance;
  }

  // Make a query
  async query(query, queryType = 'SQL') {
    let data = null;

    let response = this._getAxiosInstance().post('query.json', {
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

  // Get all installed storage plugins
  async getStorageList() {
    let data = null;
    let response = this._getAxiosInstance().get('storage.json');

    try {
      response = await response;
      data = response.data;
    } catch (error) {
      throw error;
    }

    return data;
  }

  // Get the config of a specific storage plugin by name
  async getStoragePluginByName(name) {
    let data = null;
    let response = this._getAxiosInstance().get(
      `storage/${encodeURIComponent(name)}.json`
    );

    try {
      response = await response;
      data = response.data;
    } catch (error) {
      throw error;
    }

    return data;
  }

  // Enable a specific storage plugin by name
  async enableStoragePluginByName(name) {
    let data = null;
    let response = this._getAxiosInstance().get(
      `storage/${encodeURIComponent(name)}/enable/true.json`
    );

    try {
      response = await response;
      data = response.data;
    } catch (error) {
      throw error;
    }

    return data;
  }

  // Disable a specific storage plugin by name
  async disableStoragePluginByName(name) {
    let data = null;
    let response = this._getAxiosInstance().get(
      `storage/${encodeURIComponent(name)}/enable/false.json`
    );

    try {
      response = await response;
      data = response.data;
    } catch (error) {
      throw error;
    }

    return data;
  }

  // Add a new storage plugin by name and definition
  async createStoragePluginByName(definition) {
    let name = definition.name;
    let data = null;
    let response = this._getAxiosInstance().post(
      `storage/${encodeURIComponent(name)}.json`,
      definition
    );

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
TESTS

let gimlet = new Gimlet({
  host: 'localhost',
  port: 8047,
  ssl: false,
  user: 'Patrick'
});
*/

// 'select * from dfs.`/Users/Patrick/Downloads/3722_geodatendeutschland_1001_20180710.csv` limit 3'

/*
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
*/

/*
let data = gimlet.createStoragePluginByName({
  name: 'SuperTestXxX',
  config: {
    type: 'file',
    enabled: true,
    connection: 'file:///',
    workspaces: { root: { location: '/', writable: false, defaultInputFormat: null } },
    formats: null
  }
});

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
