import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'db',
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

export default connection;
