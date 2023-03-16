import SqliteProvider from "better-sqlite3";
import { dev as isDev } from "$app/environment";

export const Database = new SqliteProvider(`${ isDev ? "" : "/data/" }auth.sqlite3`);