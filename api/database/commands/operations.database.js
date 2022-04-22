const connection = require("../connection.database");
const sql = require("mssql");

const spGetOperations = (params) => {
  const { user, offset, limit } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("USER", sql.Int, user)
          .input("OFFSET", sql.Int, offset)
          .input("LIMIT", sql.Int, limit)
          .execute("spGetOperations", (error, result) => {
            resolve(result.recordset);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const spGetFilteredOperations = (params) => {
  const { category, user, offset, limit } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("CATEGORY", sql.Int, category)
          .input("USER", sql.Int, user)
          .input("OFFSET", sql.Int, offset)
          .input("LIMIT", sql.Int, limit)
          .execute("spGetExpensesFilteredByCategory", (error, result) => {
            resolve(result.recordset);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const spPutOperation = (params) => {
  const { uid, category, amount, description, date } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("UID", sql.Int, uid)
          .input("Category", sql.Int, category)
          .input("Amount", sql.VarChar(50), amount)
          .input("Description", sql.VarChar(50), description)
          .input("DateOperation", sql.DateTime, date)
          .execute("spPutOperation", (error, result) => {
            resolve(result.rowsAffected);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const spDeleteOperation = (params) => {
  const { uid } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("UID", sql.Int, uid)
          .execute("spDeleteOperation", (error, result) => {
            resolve(result.rowsAffected);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const cmdPostOperation = (params) => {
  const { user, type, category, amount, description, date } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("User", sql.Int, user)
          .input("Type", sql.Int, type)
          .input("Category", sql.Int, category)
          .input("Amount", sql.VarChar(50), amount)
          .input("Description", sql.VarChar(50), description)
          .input("DateOperation", sql.DateTime, date)
          .execute("spPostOperation", (error, result) => {
            resolve(result.rowsAffected);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  cmdPostOperation,
  spGetOperations,
  spGetFilteredOperations,
  spPutOperation,
  spDeleteOperation,
};
