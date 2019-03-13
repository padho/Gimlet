'use strict';

const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
axiosCookieJarSupport(axios);

class Gimlet {
  constructor(args) {
    if (!args) {
      args = {};
    }

    this.host = args.host || 'localhost';
    this.port = args.port || 8047;
    this.user = args.user || null;
    this.password = args.password || null;
    this.ssl = args.ssl || false;
    this.restTimeout = args.restTimeout || 15000;

    if (this.ssl) {
      this.protocol = 'https';
    } else {
      this.protocol = 'http';
    }

    this.baseUrl = this.protocol + '://' + this.host + ':' + this.port + '/';
  }

  async _authenticate() {
  	const cookieJar = new tough.CookieJar();

  	// check if authentication is set
  	if(this.password === null) {
  		return await new Promise((resolve, reject) => {
  			resolve(cookieJar);
  		});
  	}
    
  	let requestBody = `j_username=${this.user}&j_password=${this.password}`;
    const headers = {
    	'Content-Type': 'application/x-www-form-urlencoded'
	  };

  	let result = axios.post(this.baseUrl + '/j_security_check', requestBody, { 
      headers: headers,
      jar: cookieJar,
      withCredentials: true
    }
   );

  	try {
      await result;
  		return cookieJar;
  	} catch(e) {
  		throw 'Could not authenticate request';
  	}
  }

  _getHeaders(cookieJar) {
    return {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      'User-Name': this.user
    };
  }

  async _getAxiosInstance() {    
    const cookieJar = await this._authenticate();
    const headers = this._getHeaders(cookieJar);     

    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.restTimeout,
      headers: headers,
      withCredentials: true
    });

    axiosCookieJarSupport(axiosInstance);
    axiosInstance.defaults.jar = cookieJar;

    return axiosInstance;
  }

  // Make a query
  async query(query, queryType = 'SQL') {
    let data = null;
    const instance = await this._getAxiosInstance();

    //console.log(instance);

    let response = instance.post('query.json', {
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
    const instance = await this._getAxiosInstance();
    
    let response = instance.get('storage.json');

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
    const instance = await this._getAxiosInstance();
    
    let response = instance.get(
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
    const instance = await this._getAxiosInstance();
    
    let response = instance.get(
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
    const instance = await this._getAxiosInstance();
    
    let response = instance.get(
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
    const instance = await this._getAxiosInstance();
    
    let response = instance.post(
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

  // Delete a storage plugin by name
  async deleteStoragePluginByName(name) {
    let data = null;
    const instance = await this._getAxiosInstance();
    
    let response = instance.delete(
      `storage/${encodeURIComponent(name)}.json`
    );

    try {
      response = await response;
      data = response.data;
      if (typeof data.result !== undefined) {
        if (data.result === 'success') {
          return true;
        }
        return false;
      }
    } catch (error) {
      throw error;
    }

    return data;
  }

  /*
    Convenience Methods
  */

  // Check if storage plugin exists
  async storagePluginExists(name) {
    let data = await this.getStoragePluginByName(name);

    if (typeof data.config === 'undefined' || data.config === null) {
      return false;
    }

    return true;
  }
}

module.exports = { Gimlet };
