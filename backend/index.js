const express = require("express");
const cors = require("cors");
const connection = require("./src/config/dbConfig");
const UserRouter = require("./src/routes/user");
const ApiRouter = require("./src/routes/api");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
        value: "Bearer <JWT>",
      },
    },
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "welcome!" });
});

app.use("/user", UserRouter);
app.use("/api", ApiRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`server started at http://localhost:${PORT}`);
  await connection();
});
