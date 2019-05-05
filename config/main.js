var config = {
  'development': {
    'database': 'mongodb://localhost:27017/servi',
    'port': '3000',
    'host': 'http://localhost:3002',
    'currentVersion': 'v1,',
    /*'secret': 'B7syiTVp15hE9yvIUd8560sf0aQzM8qjTKPphTqX3JrQxV9ivtndyU5ZKY1P4Jfm',
    'dropboxKey': 'NvYd1EG3UVAAAAAAAAAAD0yHw3BJ0FgtYUTZrA9J7gOHByZy7jZRAvaMX2wMf9FY',
    'googleAPI': 'AIzaSyCtfIFepU825FE6ErOAvwR96sYL4FuzNPc',
    'recoveryCodeExpirationTime': '1800000',
    'minUserAgentSupportAndroid': 'pddevelopment-android/0.0.1',
    'minUserAgentSupportIos': 'pddevelopment-ios/0.0.1'*/
  },
  'test': {
    'database': 'mongodb://admin:admin123@ds147436.mlab.com:47436/servitest',
    'port': '3000',
    'host': 'http://servitest.herokuapp.com',
    'currentVersion': 'v1,',
  },
  'production': {
    'database': 'mongodb://admin:gaviotablanca$123@ds119422.mlab.com:19422/directpay',
    'port': '80',
    'host': 'http://servi.herokuapp.com',
  }
}
exports.get = function (env) {
  env = "test";
  return config[env] || config.development;
}