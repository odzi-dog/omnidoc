import type { LayoutServerLoad } from "./$types";
import { getDatabase } from "$lib/database";
import { Workspace } from "$lib/database/entities";

const load: LayoutServerLoad = async function() {
    const Database = getDatabase();

    // Getting all workspaces
    // todo:
    // get THIS user's workspaces
    const workspaces = await Database.find(Workspace, {});
    return {
        workspaces,
    };
};

export { load };