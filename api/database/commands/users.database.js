const connection = require("../connection.database");
const sql = require("mssql");

const spGetUserByEmail = (params) => {
  const { email } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("Email", sql.VarChar(100), email)
          .execute("spGetUserByEmail", (error, result) => {
            resolve(result.recordset);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const spGetUserById = (params) => {
  const { uid } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("UID", sql.Int, uid)
          .execute("spGetUserById", (error, result) => {
            resolve(result.recordset);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const spGetUserBudget = (params) => {
  const { user } = params;
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("UID", sql.Int, user)
          .execute("spGetUserBudget", (error, result) => {
            resolve(result.recordset);
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const cmdPostUser = (params) => {
  const { email, password } = params;
  console.log(email, password);
  return new Promise((resolve, reject) => {
    connection()
      .then(async (pool) => {
        await pool
          .request()
          .input("Email", sql.VarChar(100), email)
          .input("Password", sql.VarChar(100), password)
          .execute("spPostUser", (error, result) => {
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
  spGetUserBudget,
  spGetUserByEmail,
  spGetUserById,
  cmdPostUser,
};
