// swagger.config.js

import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMC Study API",
      version: "1.0.0",
      description: "UMC Study API with express, API 설명",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./swagger/*.yaml"], // 여기에 YAML 파일들을 참조합니다
};

export const specs = SwaggerJsdoc(options);
