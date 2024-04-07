import mysqlDb from 'mysql2';

const dbCon = mysqlDb.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "qp",
});

export { dbCon }