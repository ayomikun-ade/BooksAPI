const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

app.use(express.json());

//swagger config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      description: "CRUD API for managing books.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes
app.use("/books", require("./routes/books"));

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
