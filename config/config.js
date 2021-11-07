require('dotenv').config(); // this is important!
module.exports =
{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER_TEST,
    "password": process.env.DB_PASS_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER_PROD,
    "password": process.env.DB_PASS_TEST_PROD,
    "database": process.env.DB_NAME_TEST_PROD,
    "host": process.env.DB_HOST_TEST_PROD,
    "dialect": "mysql"
  }
}
