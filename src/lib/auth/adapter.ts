import type { KyselyLuciaDatabase } from "@lucia-auth/adapter-kysely";
import { default as kysely } from "@lucia-auth/adapter-kysely";
import { Kysely, SqliteDialect } from "kysely";
import { Database } from "./database";

export const KyselyInstance = new Kysely<KyselyLuciaDatabase>({
    dialect: new SqliteDialect({
        database: Database,
    }),
})

export const Adapter = kysely(KyselyInstance, "better-sqlite3");