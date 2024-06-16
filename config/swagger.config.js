import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Clover's API",
      version: "1.0.0",
      description: "UMC Study with express",
    },
    //host: "localhost:3306",
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./src/routes/*.js", "./swagger/*.yaml"],
};

export const swaggerSpec = swaggerJSDoc(options);