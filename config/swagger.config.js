// swagger.config.js

import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        info: {
            title: 'UMC Study API',
            version: '1.0.0',
            description: 'UMC Study API with express, API 설명'
        },
        host: 'localhost:3000',
        basepath: '../'
    },
    apis: ['./src/routes/*.js', './swagger/user.swagger.yaml', './swagger/store.swagger.yaml', './swagger/review.swagger.yaml']
};

export const specs = SwaggerJsdoc(options);