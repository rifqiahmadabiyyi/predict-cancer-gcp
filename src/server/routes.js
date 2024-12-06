const postPredictHandler = require('../server/handler');
const getPredictionHistoryHandler = require('../server/historyHandler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getPredictionHistoryHandler, // Add the history handler
  }
]
 
module.exports = routes;