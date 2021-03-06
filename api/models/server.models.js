const express = require("express");
const cors = require("cors");

const database = require("../database/connection.database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.endpoint = {
      users: "/api/users",
      budgets: "/api/budgets",
      operations: "/api/operations",
      categories: "/api/categories",
    };

    // DDBB Connection
    this.connectionDB();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    // Cors
    this.app.use(cors());

    // Reading and writing JSON
    this.app.use(express.json());
  }

  routes() {
    // Endpoints to users
    this.app.use(this.endpoint.users, require("../routes/users.routes"));

    // // Endpoints to budgets
    // this.app.use(this.endpoint.budgets, require("../routes/budgets.routes"));

    // Endpoints to operations
    this.app.use(
      this.endpoint.operations,
      require("../routes/operations.routes")
    );

    // Endpoints to categories
    this.app.use(
      this.endpoint.categories,
      require("../routes/categories.routes")
    );
  }

  connectionDB() {
    database()
      .then(() => {
        console.log("Successful connection with database.");
      })
      .catch((err) => {
        console.log(err);
      });

    // try {
    //   database.connect((error) => {
    //     if (error) {
    //       throw error;
    //     }

    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Successful connection on port " + this.port);
    });
  }
}

module.exports = Server;
