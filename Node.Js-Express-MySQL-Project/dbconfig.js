var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();

var pool = mysql.createPool({
  connectionLimit: 10,
  queueLimit: 100,
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mysqldb',
  connectTimeout: 10000,
  waitForConnections: true,
  acquireTimeout: 10000,
  debug: false
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('MySQL Connected...');

  const createTable = `
    CREATE TABLE IF NOT EXISTS employees (
      emp_id VARCHAR(10) PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      middle_name VARCHAR(50),
      last_name VARCHAR(50) NOT NULL,
      suffix VARCHAR(10),
      address TEXT,
      city VARCHAR(50),
      province VARCHAR(50),
      zip VARCHAR(10),
      location VARCHAR(50),
      department VARCHAR(50),
      project VARCHAR(50),
      team VARCHAR(50),
      position VARCHAR(50),
      employment_type VARCHAR(20),
      user_profile VARCHAR(20),
      manager VARCHAR(10),
      vendor VARCHAR(100),
      email VARCHAR(100),
      phone VARCHAR(20),
      ctc_id VARCHAR(20),
      ctc_place VARCHAR(50),
      ctc_date DATE,
      ctc_amount DECIMAL(10,2),
      resident_cert VARCHAR(20),
      notes TEXT,
      pay_frequency VARCHAR(20) NOT NULL,
      sex CHAR(1),
      active BOOLEAN DEFAULT TRUE,
      kasambahay BOOLEAN DEFAULT FALSE,
      birthday DATE,
      date_hired DATE NOT NULL,
      date_regularized DATE,
      date_separated DATE,
      contract_start DATE,
      contract_end DATE,
      minimum_wage_earner BOOLEAN DEFAULT FALSE,
      monthly_rate DECIMAL(10,2),
      tax_id VARCHAR(20),
      sss_number VARCHAR(20),
      philhealth_id VARCHAR(20),
      hdmf_id VARCHAR(20),
      hdmf_account VARCHAR(20),
      bank_name VARCHAR(50),
      bank_account VARCHAR(20),
      rate_type VARCHAR(20),
      base_monthly_pay DECIMAL(10,2),
      days_per_month DECIMAL(5,2),
      hours_per_day DECIMAL(5,2),
      daily_rate DECIMAL(10,2),
      hourly_rate DECIMAL(10,2),
      cost_of_living DECIMAL(10,2),
      representation_allowance DECIMAL(10,2),
      housing_allowance DECIMAL(10,2),
      transportation_allowance DECIMAL(10,2),
      last_updated VARCHAR(100)
    )`;
  connection.query(createTable, (err) => {
    if (err) throw err;
    console.log('Employees table created or exists');
    connection.release();
  });
});

pool.on('connection', function (connection) {
  console.log('MySQL DB Connection established');
});
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
pool.on('enqueue', function () {
  console.log('Waiting for available connection slot...');
});
pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

module.exports = pool;