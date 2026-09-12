const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath, { 
  readonly: false,
  fileMustExist: true 
});

export default db;