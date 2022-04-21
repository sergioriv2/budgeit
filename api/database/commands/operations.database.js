const sql = require("../connection.database");

const cmdGetOperationsPaginated = (params) => {
  const { user, offset, limit } = params;
  return new Promise((resolve, reject) => {
    // Due to limitations in the the free mysql database host provider, I need to write the query in the source code.
    sql.query(
      `
      SELECT Operations.ID_Operation as 'uid', Operation_Types.Desc_Operation_Type as 'type', Operations.ID_Operation_Type_Operation as 'type_uid',
      Categories.Desc_Category as 'category', Operations.Amount_Operation as 'amount', Operations.Date_Operation as date,
      Operations.Description_Operation as 'description', Operations.ID_Category_Operation 'category_uid'
      FROM Operations
      INNER JOIN Users ON Users.ID_User = Operations.ID_User_Operation
      INNER JOIN Operation_Types ON Operation_Types.ID_Operation_Type = Operations.ID_Operation_Type_Operation
      INNER JOIN Categories ON Categories.ID_Category = Operations.ID_Category_Operation
      WHERE Operations.ID_User_Operation = ? AND Operations.Toggle_Operation = 1 ORDER BY Operations.Date_Operation DESC LIMIT ?, ?;
      `,
      [user, offset, limit],
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

const spPutOperation = (params) => {
  const { uid, category, amount, description, date } = params;
  return new Promise((resolve, reject) => {
    sql.query(
      "CALL spPutOperation(?, ?, ?, ?, ?)",
      [uid, category, description, amount, new Date(date)],
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

const spDeleteOperation = (params) => {
  const { uid } = params;
  return new Promise((resolve, reject) => {
    sql.query("CALL spDeleteOperation(?)", [uid], (err, res) => {
      try {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const cmdPostOperation = (params) => {
  const { user, type, category, amount, description, date } = params;
  return new Promise((resolve, reject) => {
    sql.query(
      "CALL spPostOperation(?, ?, ?, ?, ?, ?)",
      [user, type, category, amount, description, new Date(date)],
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
  cmdPostOperation,
  cmdGetOperationsPaginated,
  spPutOperation,
  spDeleteOperation,
};
