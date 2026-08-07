import db from "./db.js";

export function initializeDatabase() {

db.exec(`

CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT,

fullname TEXT,

role TEXT,

createdAt TEXT DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS products(

id INTEGER PRIMARY KEY AUTOINCREMENT,

barcode TEXT UNIQUE,

name TEXT NOT NULL,

category TEXT,

unit TEXT,

costPrice REAL,

sellingPrice REAL,

quantity INTEGER DEFAULT 0,

minimumStock INTEGER DEFAULT 5,

createdAt TEXT DEFAULT CURRENT_TIMESTAMP

);

`);

console.log("Database initialized.");

}