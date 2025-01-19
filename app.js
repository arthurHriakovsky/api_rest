const express = require("express");
const swaggerUi = require("swagger-ui-express");


const swaggerDocument = require("./swagger.json");
const errorHandler = require("./tasks/error_handler")
const basicTasksRoutes = require("./tasks/basic_tasks");

const app = express();

//  Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(basicTasksRoutes);

//option to choose swagger inretface
app.get("/", (req, res) => {
  res.send(`
    <h1> Task Management API</h1>
    <p>Use <a href="/api-docs"> for swagger API</a></p>
  `);
});

// should be at the end
app.use(errorHandler);

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
