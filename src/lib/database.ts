import { MikroORM } from '@mikro-orm/core';
import Post from './entities/Post';

const instance = await MikroORM.init({
    entities: [Post],
    dbName: 'data.sqlite3',
    type: 'sqlite',
    migrations: {
        path: "migrations",
        emit: "js",
    },
});

// Migrating
const migrator = instance.getMigrator();
await migrator.createMigration();
await migrator.up();

export default instance;

export function getDatabase() {
    return instance.em.fork();
};