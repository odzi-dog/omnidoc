import { MikroORM } from '@mikro-orm/core';
import { TextDocument, Workspace } from './entities';

const instance = await MikroORM.init({
    entities: [TextDocument, Workspace],
    dbName: 'data.sqlite3',
    type: 'better-sqlite',
    migrations: {
        path: "migrations",
        emit: "js",
    },
});

// Migrating
const migrator = instance.getMigrator();
if (await migrator.checkMigrationNeeded()) {
    await migrator.createMigration();
    await migrator.up();
};

export default instance;

export function getDatabase() {
    return instance.em.fork();
};