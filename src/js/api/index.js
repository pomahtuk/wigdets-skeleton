var request = require('superagent'),
 legacyIESupport = require('superagent-legacyiesupport');

// apply promise polyfill
require('es6-promise').polyfill();

function ApiClient() {
  this.endpoint = "//geo-api.kupibilet.ru";
  return true;
}

ApiClient.prototype.getCurrentAirpot = function () {
  var endpoint = this.endpoint;

  return new Promise(
    // The resolver function is called with the ability to resolve or
    // reject the promise
    function(resolve, reject) {
      request
        .get(endpoint + '/nearest')
        .use(legacyIESupport)
        .withCredentials() // this will be ignored if on IE 8 & 9
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res) {
            reject(err || 'empty response');
          } else {
            // TODO: return only airport code
            resolve(res);
          }
        });
    }
  );
};

ApiClient.prototype.getCheapDestinations = function (airportCode) {
  var endpoint = this.endpoint,
    request = this.request;

  return new Promise(
    // The resolver function is called with the ability to resolve or
    // reject the promise
    function(resolve, reject) {
      request
        .get(endpoint + '/advantage_airports_by_airport/' + airportCode)
        .use(legacyIESupport)
        .withCredentials() // this will be ignored if on IE 8 & 9
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res) {
            reject(err || 'empty response');
          } else {
            // TODO: return json body
            resolve(res);
          }
        });
    }
  );
};

module.exports = ApiClient;
