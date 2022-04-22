const connection = require("../connection.database");
// const sql = require("mssql");

const spGetCategories = () => {
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        const { recordset } = await pool.request().execute("spGetCategories");
        resolve(recordset);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  spGetCategories,
};
