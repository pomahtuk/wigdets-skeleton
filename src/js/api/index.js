var request = require('superagent'),
 legacyIESupport = require('superagent-legacyiesupport');

// apply promise polyfill
require('es6-promise').polyfill();

function ApiClient() {
  // this.endpoint = "//geo-api.kupibilet.ru";
  // this.endpoint = "//ws.office:4000";
  this.endpoint = "http://127.0.0.1:8000";
  return true;
}

ApiClient.prototype.getCurrentAirpot = function (test) {
  var test = test || false,
    endpoint = this.endpoint;

  return new Promise(
    // The resolver function is called with the ability to resolve or
    // reject the promise
    function(resolve, reject) {

      // this code is temporary!
      if (test) {
        setTimeout(function () {
          resolve({
            "code": "LED",
            "price": 33411,
            "latitude": -25.363,
            "longitude": 131.044
          });
        }, 500);
        return true;
      }
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
            console.log(res);
            resolve(res);
          }
        });
    }
  );
};

ApiClient.prototype.getCheapDestinations = function (defaultAirport, test) {
  var endpoint = this.endpoint,
    request = this.request;

  return new Promise(
    // The resolver function is called with the ability to resolve or
    // reject the promise
    function(resolve, reject) {

      // this code is temporary!
      if (test) {
        setTimeout(function () {
          var fakeResponse = [
            {
              "code": "MJZ",
              "price": 7285,
              "latitude": -24.463,
              "longitude": 130.644
            }, {
              "code": "AMS",
              "price": 8457,
              "latitude": -26.063,
              "longitude": 131.344
            }
          ];

          defaultAirport.isDefault = true;
          fakeResponse.push(defaultAirport);

          resolve(fakeResponse);
        }, 750);

        return true;
      }

      request
        .get(endpoint + '/advantage_airports_by_airport/' + defaultAirport.code)
        .use(legacyIESupport)
        .withCredentials() // this will be ignored if on IE 8 & 9
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res) {
            reject(err || 'empty response');
          } else {
            // TODO: return json body
            //
            defaultAirport.isDefault = true;
            res.push(defaultAirport);

            resolve(res);
          }
        });
    }
  );
};

module.exports = ApiClient;
