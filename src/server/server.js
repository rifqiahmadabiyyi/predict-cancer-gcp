require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
            payload: {
                maxBytes: 1024 * 1024, // 1MB (set batasan ukuran payload menjadi 1MB)
                parse: true, // Pastikan payload bisa diparse
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);
    
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response.isBoom && response.output.statusCode === 413) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000',
            });
            newResponse.code(413);
            return newResponse;
        }


        // Kesalahan input (InputError)
        if (response instanceof InputError) {
            return h
                .response({
                    status: 'fail',
                    message: 'Terjadi kesalahan dalam melakukan prediksi',
                })
                .code(400);
        }
 
        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }
 
        return h.continue;
    });

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
