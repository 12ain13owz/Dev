const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");

app.use(express.json());

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Documentation",
      version: "1.0.0",
      description: "Api Simple Documentation",
    },
  },
  servers: [{ url: "http://localhost:3000/" }],
  apis: ["index.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @swagger
 * /api/items:
 *  get:
 *    summary: Get all items
 *    responses:
 *      200:
 *        description: Successful response
 *      500:
 *        description: Internal server error
 */

app.get("/items", (req, res) => {
  res.json(items);
});
app.post("/item", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
