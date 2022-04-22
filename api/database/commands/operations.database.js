const connection = require("../connection.database");
const sql = require("mssql");

const spGetOperations = (params) => {
  const { user, offset, limit } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("USERS", sql.Int, user)
          .input("OFFSET", sql.Int, offset)
          .input("LIMIT", sql.Int, limit)
          .execute("spGetOperations", (error, result) => {
            resolve(result);
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
          .input("USERS", sql.Int, user)
          .input("OFFSET", sql.Int, offset)
          .input("LIMIT", sql.Int, limit)
          .execute("spGetExpensesFilteredByCategory", (error, result) => {
            resolve(result);
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
          .input("CATEGORY", sql.Int, category)
          .input("AMOUNT", sql.VarChar(50), amount)
          .input("DESCRIPTION", sql.VarChar(50), description)
          .input("DATE", sql.DateTime, date)
          .execute("spGetExpensesFilteredByCategory", (error, result) => {
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
          .input("USER", sql.Int, uid)
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
          .input("USER", sql.Int, user)
          .input("TYPE", sql.Int, type)
          .input("CATEGORY", sql.Int, category)
          .input("AMOUNT", sql.VarChar(50), amount)
          .input("DESCRIPTION", sql.VarChar(50), description)
          .input("DATE", sql.DateTime, date)
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
