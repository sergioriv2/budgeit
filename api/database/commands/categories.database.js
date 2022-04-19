const sql = require("../connection.database");

const spGetCategories = () => {
  return new Promise((resolve, reject) => {
    sql.query("CALL spGetCategories()", (err, res) => {
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

module.exports = {
  spGetCategories,
};
