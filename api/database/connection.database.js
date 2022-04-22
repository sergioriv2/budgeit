const sql = require("mssql");

const sqlConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

// const connection = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       // make sure that any items are correctly URL encoded in the connection string
//       resolve(sql.connect(sqlConfig));
//       console.dir(result);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

const connection = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await sql.connect(sqlConfig, (error) => {
        reject(error);
      });

      sql.on("error", (err) => {
        throw err;
      });

      resolve(pool);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = connection;
