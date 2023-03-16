import SqliteProvider from "better-sqlite3";

export const Database = new SqliteProvider(`./data/auth.sqlite3`);