const sql = require("../connection.database");

const spGetUserByEmail = (params) => {
  const { email } = params;
  return new Promise((resolve, reject) => {
    sql.query("CALL spGetUserByEmail(?)", email, (err, res) => {
      try {
        if (err) {
          reject(err);
          return;
        }
        if (res.length) resolve(res[0]);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const spGetUserById = (params) => {
  const { uid } = params;
  return new Promise((resolve, reject) => {
    sql.query("CALL spGetUserById(?)", uid, (err, res) => {
      try {
        if (err) {
          reject(err);
          return;
        }
        if (res.length) resolve(res[0]);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const spGetUserBudget = (params) => {
  const { user } = params;
  return new Promise((resolve, reject) => {
    sql.query("CALL spGetUserBudget(?)", [user], (err, res) => {
      try {
        if (err) {
          reject(err);
          return;
        }

        resolve(res[0]);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const cmdPostUser = (params) => {
  const { email, password } = params;
  return new Promise((resolve, reject) => {
    sql.query(
      "INSERT INTO Users (Email_User, Password_User) VALUES (?, ?)",
      [email, password],
      (err, res) => {
        try {
          if (err) {
            reject(err);
            return;
          }

          resolve(res);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  spGetUserBudget,
  spGetUserByEmail,
  spGetUserById,
  cmdPostUser,
};
